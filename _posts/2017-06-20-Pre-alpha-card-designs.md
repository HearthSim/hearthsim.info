---
layout: post
title: Pre-alpha card designs
permalink: /blog/2017/pre-alpha-card-designs/
---

One of the features of the HearthSim organization is the
[hsdata git repository](https://github.com/HearthSim/hsdata/). This repository
is an auto-generated history of the core text data files behind every public
Hearthstone build.

The main file it features is `CardDefs.xml`. The way cards are stored by the
game, internally, has changed several times over the course of its life. From
CSV in the earliest builds to, nowadays, Unity3D data split up over multiple
different databases... I figured we would want a single, human-readable file
format that would be consistent across all builds.

So I settled on the CardDefs.xml multi-locale format that was present in the
early release builds of the game. This single file is generated for every
single builds into a git repository, which can be diffed across all versions.

Some fun stuff appears when you look at some of them. Today I want to look at
the very first builds of the game.

[Build 3140](https://github.com/HearthSim/hsdata/blob/3140/CardDefs.xml)
features an interesting issue: Before the game was even translated, the various
localized text fields were still used. Most of the time, they featured the same
text as the american-english (`enUS`) version, but it looks like they were not
updated alongside it. This means some early card designs leaked into the public
build.

Most of them are just typos, cosmetic changes and such. For example,
**Transform** used to be a keyword (bolded), the spell-shrouded description used
to be _Can't be selected as a target by Spells or Hero Powers_, and the
**Overload** keyword was originally named **Recall** (and in the code itself, it
even remained that way long after release).

Some cards were renamed:

* **Healing Stream Totem** -> [**Healing Totem**](https://hsreplay.net/cards/764//)
* **Chaos Energy** -> [**Demonfire**](https://hsreplay.net/cards/1142/)
* **Spirit** -> [**Leokk**](https://hsreplay.net/cards/226/)
* **Alarm-O-Bot** -> [**Alarm-o-Bot**](https://hsreplay.net/cards/1658) (Notice the casing difference?/)
* **Dual Warblades** -> [**Dual Warglaives**](https://hsreplay.net/cards/1642/)
* **Warblade of Azzinoth** -> [**Warglaive of Azzinoth**](https://hsreplay.net/cards/1639/)
* **Shard of Azzinoth** -> [**Flame of Azzinoth**](https://hsreplay.net/cards/1751/)

Some changes were more significant in terms of balance. Originally:

* [**Arcane Explosion**](https://hsreplay.net/cards/447) and [**Flamestrike**](https://hsreplay.net/cards/1004/) also dealt damage to the enemy hero.
* [**Charge**](https://hsreplay.net/cards/344/) gave charge to all minions.
* [**Deathwing**](https://hsreplay.net/cards/834/) did not discard your hand.
* [**Swipe**](https://hsreplay.net/cards/64/) only dealt 3 damage.
* [**Starfall**](https://hsreplay.net/cards/86/) only dealt 4 damage when vs. a single enemy.
* [**Mortal Strike**](https://hsreplay.net/cards/804/) dealt 8 damage below 12 health.
* [**Ancestral Healing**](https://hsreplay.net/cards/149/) did not give **Taunt**
* [**Gorehowl**](https://hsreplay.net/cards/810/) did not reduce its Attack vs. minions. (Infinite durability!)
* [**Hungry Crab**](https://hsreplay.net/cards/443/) would destroy *all* murlocs and gain +2/+2 for each.
* [**Thoughtsteal**](https://hsreplay.net/cards/30/) would actually steal: _Draw 2 cards from your opponent's deck._.

Keeping in mind that we are only looking at text changes (cost, attack and
health changes are not visible in this diff), let's look at some cards which
were completely redesigned:

* [**Bloodsail Corsair**](https://hsreplay.net/cards/997/): _**Battlecry:** Gain Health equal to the Durability of your weapon._
* [**Captain Greenskin**](https://hsreplay.net/cards/456/): _**Battlecry:** Give ALL other Pirates +2/+2._
  * Funnily enough, Greenskin was at the time changed to read:
    _Whenever you attack with your hero, draw a card._
* [**Captain's Parrot**](https://hsreplay.net/cards/530/): _Whenever you play a Pirate, draw a card._
* [**Emperor Cobra**](https://hsreplay.net/cards/1098/): _Has +Attack equal to the number of Mana Crystals you have._
* [**Harrison Jones**](https://hsreplay.net/cards/912/): _**Battlecry:** Steal an enemy weapon._
* [**Lorewalker Cho**](https://hsreplay.net/cards/1135/): _If you end your turn without playing a card, draw a card._
* [**Millhouse Manastorm**](https://hsreplay.net/cards/855/): _**Battlecry:** Put a 'Mega-Blast' card into your hand._
  * The **MEGA-BLAST!!!** card originally read: _Deal 5 damage to all enemies._
* [**Prophet Velen**](https://hsreplay.net/cards/9/): _**Battlecry:** Draw a card for each undamaged character._
* [**Southsea Captain**](https://hsreplay.net/cards/680/): _**Battlecry:** Return a hero's weapon to his hand._
* [**Southsea Deckhand**](https://hsreplay.net/cards/724/): _**Battlecry:** Your equipped weapon gets +1 Durability._
* [**Spellbender**](https://hsreplay.net/cards/366/): _**Secret:** When a minion is targeted by an enemy spell, Summon a 1/1 and target it instead._

It's interesting to see just how much the pirate package changed, especially
considering that it was not seriously used until MSOG.

And finally, we also see a couple of cards which were straight up replaced by
completely different ones upon being redesigned:

* [**Naturalize**](https://hsreplay.net/cards/233/) replaced **Demoralizing Roar**: _Enemy minions get -3 Attack this turn._
* [**Unbound Elemental**](https://hsreplay.net/cards/774/) replaced **Grounding Totem**: _Your other minions can't be targeted by enemy spells or Hero Powers._


**UPDATE**: A couple of extra insights on these changes from Ben Brode himself:

> I think we dropped Demoralizing Roar because Druid was underpowered at the time, and that card was pretty bad.
>
> Old Deathwing was an 8/8 at the time, and very powerful. Our first internal tournament featured many Deathwings. :)
>
> Emperor Cobra was a similar design to a WoW:TCG card I liked, but it was less interesting in Hearthstone when our resource model became +1 Mana a turn.
>
> &mdash; Ben Brode

Jerome
