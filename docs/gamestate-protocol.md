---
layout: page
title: The Hearthstone Game State Protocol
permalink: /docs/gamestate-protocol/
---

## Core concepts

A Hearthstone game is very easy to represent: At any point in time, all it is is a bucket of entities.
Each entity is a key-value store of properties, which the game refers to as "tags" or "GameTags".

Let's dive in.


### Tags and the GameTag enumerator

Almost every single property on every single entity is represented as a tag: A GameTag key, with an integer value.

A tag is always an integer value. There is no difference between a tag not having a value, or with its value equal to `0`.

The GameTag enum itself is very long (500+ members at the time of this document being written) and values are added/removed
all the time (although rarely renamed).

Not all GameTag values are known, because not all GameTag members are made available in the Hearthstone client.
There are a number of unknown tags being passed around in the Hearthstone protocol which have no name reference.
There are also plenty of tags which are not sent down to the client at all because the client does not need them, or should not know about them.


### Zones

From its creation and until the game ends, entities are placed in Zones. There are six zones, per the `Zone` enum:

 - `PLAY`
 - `DECK`
 - `HAND`
 - `GRAVEYARD`
 - `REMOVEDFROMGAME`
 - `SETASIDE`
 - `SECRET`

We don't need to worry about what they do yet, we just need to know that during an entity's lifecycle, it will move
between zones. This is represented by the `ZONE` tag.


### Entities

As we saw earlier, every entity in the game is a key-value store of what we now know as tags.
Every single entity has an entity ID, which is available in the `ENTITY_ID` tag.


There are three types of entities:

- `Game`. There is only one of these. It always has the entity ID `1`.
- `Player`. There is always and only two of these. They have the entity IDs `2` and `3`.
- `Card`. Everything that isn't a Game or a Player is a Card. On top of an entity ID, they also have a card ID, which identifies what card it is (its name, description, etc). **[Read up on Card IDs here](https://hearthsim.info/docs/cards/).**


### Cards

Every entity except the Game and the two Players is a card.
There are several types of cards; all of which are in the `CardType` enum.

- `HERO`: Heroes such as the two starting heroes, as well as the ICC "Death Knight" playable heroes.
- `MINION`: Minions are cards which count as minions; they can generally be put into the battlefield and attack from there.
- `SPELL`: Spells are cards which have an immediate effect when played, and do not remain in the battlefield (with the exception of Quests and Secrets)
- `ENCHANTMENT`: Enchantments are "buffs". They are usually created as a side-effect of another card, such as a spell or a minion's battlecry or aura.
- `WEAPON`: Weapons, when played, go into the player's weapon slot and pass some of their properties down to the player's hero.
- `HERO_POWER`: Those are the Hero Powers attached to a hero, playable once per turn.

Only Minions, Spells, Weapons, and - as of ICC - Heroes can be played from the hand (`HAND` zone).
Hero Powers can also be played, but only from the `PLAY` zone. Once played, they become unplayable until the game says otherwise.

Enchantments are more of an internal entity. They can be seen when you hover a card, such as a minion, that has received a buff.


## The game's lifecycle

### Creating a game

The game is created once two players are matched up.
Both players enter the game at the same time and are each assigned a "Player ID" (the Player ID is usually not relevant to the gameplay, and does not correspond to who goes first): `1` and `2`.

The `Game` entity is first created, with entity ID `1`. The two players, with player IDs `1` and `2`, are then created with entity IDs `2` and `3` (respectively).
Then, for every card in Player 1's then Player 2's decks, a Card entity is created.
Then, Player 1's initial Hero and Hero Power is created. Then Player 2's. At this point, the Game `STATE` changes to `RUNNING` and the two players' PlayStates change to `PLAYING`.
The game has started.


### State Packets

This is all well and good, but *how* do all these entities get created?

A Hearthstone game is, as we saw, a state bucket. So by creating an entity, we are mutating the global state.
This is done using State Packets, which the game sometimes confusingly refers to as "Powers".

The following State packets are defined in the `PowerType` (`Network.PowerType`) enumerator:

 - `FULL_ENTITY`
 - `SHOW_ENTITY`
 - `HIDE_ENTITY`
 - `TAG_CHANGE`
 - `BLOCK_START`
 - `BLOCK_END`
 - `CREATE_GAME`
 - `META_DATA`

Each of those packets mutates the global game state in some way.
For example, when we created the game, a `CREATE_GAME` packet was sent by the server, containing the initial state (tags) of the Game entity and the two Player entities.
Whenever a Card (a deck card, a hero, anything) was created afterwards, the `FULL_ENTITY` packet was sent by the server.
Finally, when the Game's `STATE` tag and the players' `PLAYSTATE` tags were updated, a `TAG_CHANGE` packet was sent for each of those.

The `FULL_ENTITY` packet always creates a new entity (with some initial tag state), and the `TAG_CHANGE` packet mutates a card's tags (one at a time).
These packets, alongside `CREATE_GAME`, are sufficient to follow all the state mutations in a game, but they are not sufficient to describe the entire game. Let's dive deeper.

### The Player input loop

Once the game has started and all initial serverside setup is complete, the server will hand off input to a player by giving that player "Options".
This blocks further state changes from happening until that player executes an option, or the server says otherwise (eg. a rope timeout or a disconnect).

Options control what a player can actually play. The server gives players a list of entity IDs which may be played, optionally with suboptions ("choose one" cards) and/or targets.
This means that whether or not a card is playable by a player is entirely determined by the server.
The player can then execute one of these options. The last option is usually of the `END_TURN` OptionType, allowing the player to end the turn.

Options are not part of what we call the game state. They have their own "Option State".
Upon choosing an option (executing an action, such as playing a card), the player sends a "SendOption" packet.
This causes the server to update the game state by simulating that action and returning the appropriate results, then re-evaluating what the current player's options are (or changing the current player altogether).


### Blocks

The game usually groups state changes in blocks. Because the game state protocol is flat, a block has to be opened with a `BLOCK_START` packet; then once all packets in that block have been sent, a `BLOCK_END` packet is sent to close the block.
Blocks may be nested, in cases where actions trigger other actions, which in turn may trigger other actions, and so on.
For example:
 - Player 1 plays Arcane Intellect
 - This draws a Flame Leviathan
 - Which causes its power to trigger
 - Which damages an acolyte of pain
 - Which draws another card
 - and so on.

Until Arcane Intellect has stopped drawing, the top block of Player 1 playing Arcane Intellect (a `BlockType=PLAY` block) will not close, but further blocks have been opened.
This block system allows clients to keep track of what causes what, which is important in order to ensure animations play in the correct order, with the correct targets.

There are multiple block types (`BlockType` enum):

- `ATTACK`: An entity (Hero or Minion) attacks another one.
- `JOUST`: A joust (Argent Tournament mechanic of revealing two cards and having the highest-costed one win).
- `POWER`: The "on-play" power of a card; such as a spell, a hero power, or a card's battlecry.
- `TRIGGER`: A triggered event of some kind (usually a reaction to something else happening in the game; can often be identified with the flavour icon below a minion, eg. a lightning bolt, skull, poison vial, ...)
- `DEATHS`: A special pass on the game which collects entities that have died and moves them all to the `GRAVEYARD` zone.
- `PLAY`: A card is played by a player (from their hand, or Hero Power).
- `FATIGUE`: A player receives fatigue damage.
- `RITUAL`: The `C'Thun` card is empowered in some way, causing it to appear on the field.


### Global State vs. Local known state

So, what's up with `SHOW_ENTITY` and `HIDE_ENTITY`? Well, Hearthstone is not a perfect-knowledge game.
As such, it would be cheating for a player to have as much knowledge about all the entities in the game as the server does.

Somewhere between the server's simulation and the player's client is a dispatcher which knows to hold back and/or change some packets for each player (and spectator, but that's another story).
For example, when the cards are created in the deck, although a `FULL_ENTITY` packet is created, the cards are not revealed to either player. This causes the dispatcher to hold back some of the tags in the `FULL_ENTITY` packet from both player's view of the state.
When such a card card is drawn, it is **revealed** to a player (but, usually, not to the other one!). This is where `SHOW_ENTITY` comes in: A packet, much like `FULL_ENTITY`, which includes the Card ID and a tag store, updating the known state of the entity for the player (without necessarily updating the actual game state).

This is where we find asymmetry between the server's game state (global game state) and a client's knowledge of it (local known state).


### Action Metadata

The last power type you may be wondering about is `META_DATA`. This is a non-mutative packet whose only purpose is to inform clients on the actual targets of an action and/or its damage/heal.
This is not to be confused with the `TARGET` and `DAMAGE` tags on affected entities, as they sometimes differ.
The purpose of `META_DATA` is more to guide animations, but if you only care about the game state, you do not need to worry about it. The `MetaDataType` enum has some extra members, we won't go into details there.


### Transitions between Zones

During the game's lifecycle, a card is is created (maybe in the `DECK` zone), it is then drawn (which moves it to the `HAND` zone), it might then be played (moving it to the `PLAY` zone for some time), and then it dies (which moves it to the `GRAVEYARD`).

The `PLAY` zone represents the battlefield: Everything that is currently active and revealed to both players. Heroes, hero powers, weapons, minions, even spells for a very short time. Once dead, the card moves to the `GRAVEYARD`.
Cards can, in very rare circumstances, return from the `GRAVEYARD` -- but this isn't about cards like Kel'Thuzad and Resurrect, as those create new entities (copies).

Sometimes, cards don't quite die. They may get removed from the game altogether, skipping the graveyard (`REMOVEDFROMGAME`). Or they might get transformed and moved to `SETASIDE`. Although the `SETASIDE` zone has many more uses, such as Tracking and Discover (it's a bit of a dump, really).

Finally, the `SECRET` zone holds Secrets and Quests when they are played. They're not in the `PLAY` zone, for reasons.

Each movement between two zone is called a zone transition, which is how many animations and mechanics can be thought of. "Discard" is merely a transition from `HAND` to `GRAVEYARD`. Mill? That's `DECK` to `GRAVEYARD`. Bounce? `PLAY` to `HAND`.


### End of game

The game ends when its step is `FINAL_GAMEOVER` and its state changes to `COMPLETE` (which is usually followed by `GOLD_REWARD_STATE` being set on players).
This usually happens following player playstates being set to `WON` or `LOST`. If this is caused by a hero reaching 0 Health or being Destroyed, that follows the usual `DEATHS` pass, which then includes one or both heroes dying (the game immediately ends when at least one player has no hero in `PLAY`).

The last state change is `GOLD_REWARD_STATE`; after that, clients disconnect from the game server and return to the account server, which has then received the results of the game and can update the client accordingly.


## Resources

You now know how to interpret the Hearthstone game state protocol! Here's what you can look at with your newfound knowledge:

- [Enable logging in Hearthstone](https://github.com/jleclanche/fireplace/wiki/How-to-enable-logging). This is how Hearthstone Deck Tracker works. This is how we can create replays. Looking at your logs in real time will help you learn the internals of the game at a very deep level.
- [Try the Python HSLog library](https://github.com/HearthSim/python-hslog). This library allows you to parse Power.log files and do really nifty things with them.
- [Take a look at the HSReplay XML spec](https://hearthsim.info/hsreplay/). HSReplay XML is the Hearthstone Game State replay, stored as an XML file. It's easier to parse than Power.log files, and more compact.
- [Use the Python Hearthstone library for reference](https://github.com/HearthSim/python-hearthstone). Even if you don't work with Python, several internals (including all enums and the entire card database) are exposed in that library. They are essential to working with Hearthstone data.
- [Dive into the full Hearthstone Protobufs](https://github.com/hearthsim/hs-proto) for a better understanding of how the entire protocol works.

Finally, for higher-level projects, you should know about [HearthstoneJSON](https://hearthstonejson.com/). There we expose the cards and enums available in the `hearthstone` library in a more digestible formats.
