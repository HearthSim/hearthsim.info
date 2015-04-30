---
layout: post
title: New site, new blog, new events API
---

The [Hearthsim.info](http://hearthsim.info) site is now ready. With it is this blog which will
hopefully serve for development updates on Fireplace and more.

The past weeks have been very heavy on refactoring. Card definitions went from being completely
procedural to a much more declarative API based on actions and selectors.

Since the beginning of Fireplace, it was very apparent that a Battlecry of "Draw a card" and a
Deathrattle of "Draw a card" shouldn't be different. For this, I previously wrote various helpers
which would let me define cards such as `deathrattle = drawCard`, or `action = drawCards(2)`, etc.

This had a lot of shortcomings. First one being that I would have to define new helpers for every
different target I had to deal with. In essence, "Heal your hero for 5" and
"Heal the enemy hero for 5" were completely different.
In addition to that, it was fairly hard to select targets. Targeting is a huge part of Hearthstone's
cards.

I started writing the new actions engine on the plane, almost a month ago. I started by stubbing
absolutely everything, replacing every single cards by definitions which "looked correct".
A first draft looked something like this:

```python
# Flamestrike
class CS2_032:
	action = Hit(ENEMY | MINIONS, 4)

# Glaivezooka
class GVG_043:
	action = Buff(RANDOM | FRIENDLY | MINION, "GVG_043e")
```

I then stubbed every type of action I could think of or find. Having hundreds of failing tests
for several days was fairly demoralizing, but with the help of **[@mischanix](https://github.com/mischanix)**,
a very high quality selector engine was put in place.

One of the early changes to it was the way selectors would chain. When I first designed them,
they were a mere bitmask, building off earlier work I had done to implement a getTargets method to players.
Once we moved to a class-based approach, overriding operators made sense. Selectors were then designed
to chain with the `+` operator as **and**, and the `|` operator as **or**. We made them take Enums as
arguments and Robert had the clever idea of expecting a `test()` method on those enums.

Some special selectors were also written: A SelfSelector (finds itself), TargetSelector (finds the target of self),
AdjacentSelector (finds minions adjacent to the argument), and a RandomSelector (picks *n* targets at random from the pool).

For example, to select a random friendly character in the PLAY zone excluding the source, you can do:
`RANDOM_FRIENDLY_CHARACTER = RandomSelector((Selector(Affiliation.FRIENDLY) + (Selector(CardType.MINION) | Selector(CardType.HERO)) - SELF)`

Of course, all those selectors were prefabricated, so it actually looks like `RANDOM_FRIENDLY_CHARACTER = RANDOM(FRIENDLY_CHARACTERS)`.

The `Affiliation` enum was special-built for selectors. In addition to it was another special
`TargetingRequirement` enum which was quickly replaced by simply accepting the `GameTag` enum and looking at
whether such tags were present. It is used to select damaged characters, cards with deathrattles, overload cards, etc.
i

### Actions and Events

Once selectors were done, we moved on to the actions themselves. Implementing those was fun. We brainstormed
quite a bit on whether some actions existed as "actions", or were merely an elaborate set of lower-level actions.
`FullHeal` is a good example of that. `Swap` is another action which is currently only used by
[Alarm-o-bot](http://hearthstone.gamepedia.com/Alarm-o-Bot). I decided to implement it as an action for two reasons:

 * I suspect the old version of [Mind Control Tech](http://hearthstone.gamepedia.com/Mind_Control_Tech) used the same action
 * The swapping requires a target to proceed. Alarm-o-bot will not bounce to the hand if there is nothing to swap with.

It is on the plane back home that I started to realize that my event subsystem could be rewritten in terms of actions.
In other words, "Heal a random minion" and "Whenever a friendly minion is healed" would match, and I could
express the two the same way: `Heal(RANDOM_MINION, 2)`, `Heal(FRIENDLY_MINIONS)`.

I actually did implement it that way. I was somewhat surprised, but such is the power of declarative code.
When we queue the Action object in the game, we actually make the source trigger the action of
"Heal a random minion". Triggering the action then makes it broadcast itself, meaning it will look
for entities with event listeners and match them against the actions. So we would match
`Heal(<Minion: Wisp>, 2)` to `Heal(FRIENDLY_MINIONS)`, which would evaluate the selector and look whether
the target is part of that selector.

Concretely, this work improves our capabilities to evaluate the power of cards by introspection.
Someone clever could compare cards by comparing the actions they queue on battlecry, deathrattle,
various other events which could each have weights. I look forward to see how people will use it.


### Battlecries and summons

Today was an especially exhausting day. We had long discussions with [Xinhuan](http://hearthstone.gamepedia.com/User:Xinhuan) and
[Patashu](http://hearthstone.gamepedia.com/User:Patashu) in the channel on the ordering of events when
playing cards.

This is an area which has been studied in depth but which I personally believe has been blown out of proportions.
The current model in Fireplace has been [finalized](https://github.com/jleclanche/fireplace/commit/14ea8d106a)
and is fairly simple.
As part of that work, I decided to limit the "AFTER" events to `Play` and `Summon`, which look to be the only
two interesting ones.
At the beginning of the "new-new-new-events" refactor, I thought it would be appropriate to have actions
generically broadcast themselves before and after they happen. This was actually wrong.
Gadgetzan Auctioneer confused me, in that it draws before the spell is "played", but really, it doesn't.
As it turns out, the "Play" script (AKA the Battlecry) happens during the *summon* of the card,
which I did not realize until today (I previously thought it happened after the summon and belonged in `Player.play()`, where it's been sitting for almost a year).
This has been reworked as part of the "Game actions" revamp, which was necessary in order to have
events binding to Attack, Death, Play, etc.

All this also finalized the way Deathrattles work and after 10 months, Fireplace now no longer triggers
instantaneous deaths.

There is still a lot of work to do. The event system has a few warts and forced me to move some logic
to the `actions.py`, which I'm not overly fond of. But taking care of that is less urgent and I am getting
slightly nauseous at the idea of refactoring more things.

Next up will be more tests for some elaborate setups I don't fully support yet, and the Blackrock Mountain
set to implement. Defining cards has become exceedingly easy now with extremely powerful selectors, flexible
events and, should I need it, a way to fall back to the procedural APIs from within card definitions.

[37 files changed, 905 insertions(+), 688 deletions(-)](https://github.com/jleclanche/fireplace/compare/c6bc99bdbeab...5b7d6a922039)

Jerome
