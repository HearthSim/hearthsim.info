---
layout: post
title: Always wins Brawls.
permalink: /blog/always-wins-brawls/
---

This past week has been one of the most active in Fireplace. Loads of new cards, improvements to the DSL, massive cleanups
and more.

Part of the focus, with the growing attention on the simulator, was to improve the new contributor experience.
So I wrote [a lot of new documentation](https://github.com/jleclanche/fireplace/wiki), as that was a major pain point.
Fireplace's documentation was mostly outdated since the last event rewrite.
I'm not done with it; I would like to have the DSL fully documented before doing an official public release.

The [implemented.py](https://github.com/jleclanche/fireplace/blob/d551aad06175ab2f3d2686979a53a8c0b763be13/tests/implemented.py)
script has also been improved, building on the work of @laiqu, and is very reliable now.

The other main focus was on the Fireplace DSL... which now looks *a lot* more like a real DSL. It is officially on
version 3 now.

The major changes are:

 * `action` has been renamed to `play`.
 * Sequences now support single actions, as well as falsy values in the case of callables

For example, this:

```python
action = [Destroy(TARGET)]
```

Is now this:

```python
play = Destroy(TARGET)
```

Or in the more complex case of [Trade Prince Gallywix](http://hearthstone.gamepedia.com/Trade_Prince_Gallywix), this:

```python
events = [
	Play(OPPONENT, SPELL).on(
		lambda self, player, card, *args: card.id != "GVG_028t" and [
			Give(player.opponent, card.id),
			Give(player, "GVG_028t")
		] or []
	)
]
```

Is now this:

```python
events = Play(OPPONENT, SPELL).on(
	lambda self, player, card, *args: card.id != "GVG_028t" and (
		Give(player.opponent, card.id),
		Give(player, "GVG_028t")
	)
)
```

Together, these changes affect almost every single card. [Big diffs](https://github.com/jleclanche/fireplace/commit/7cf5dba495a1c9a0718140d3d8f88864c2c3bb98)!

New functions are also available in the DSL.
The first one is [`Find()`](https://github.com/jleclanche/fireplace/commit/27ef2cca62c6742ab99baa9db758b6d1a11c1523).

```python
# Mind Control Tech
class EX1_085:
	play = Find(ENEMY_MINIONS, 4) & Steal(RANDOM_ENEMY_MINION)

# Kill Command
class EX1_539:
	play = Find(FRIENDLY_MINIONS + BEAST) & Hit(TARGET, 5) | Hit(TARGET, 3)

# Upgrade!
class EX1_409:
	play = (
		Find(FRIENDLY_WEAPON) &
		Buff(FRIENDLY_WEAPON, "EX1_409e") |
		Summon(CONTROLLER, "EX1_409t")
	)

# Tinkertown Technician
class GVG_102:
	play = (Find(FRIENDLY_MINIONS + MECH) & (
		Buff(SELF, "GVG_102e"), Give(CONTROLLER, RandomSparePart())
	))

# Ethereal Arcanist
class EX1_274:
	events = OWN_TURN_END.on(Find(FRIENDLY_SECRETS) & Buff(SELF, "EX1_274e"))
```

It is an extremely powerful evaluator that allows an if/else condition through the use of `&` and `|`.

[`Dead()`](https://github.com/jleclanche/fireplace/commit/7feff7b535c06a380e3254da13a081d62b7e2dc9) followed
shortly after, using similar logic:

```python
# Bane of Doom
class EX1_320:
	play = Hit(TARGET, 2), Dead(TARGET) & Summon(CONTROLLER, RandomMinion(race=Race.DEMON))
```

And then, [`Attr()`](https://github.com/jleclanche/fireplace/commit/4e70b3e046ae81512ade7c908c2c6381df2a554f):

```python
# Harrison Jones
class EX1_558:
	play = (
		Draw(CONTROLLER) * Attr(ENEMY_WEAPON, GameTag.DURABILITY),
		Destroy(ENEMY_WEAPON)
	)
```

`Attr` uses similar logic as `Count`, and has been implemented as a
[`LazyNum`](https://github.com/jleclanche/fireplace/commit/8a5d4228faedc703fd6813f7421db3d2f2691ab4), which means it
can be used for both action multipliers and action arguments.

The last addition is [`ID()`](https://github.com/jleclanche/fireplace/commit/93f7275bf2ecae687ece11758495a803c4015429).
Remember Gallywix?

```python
events = Play(OPPONENT, SPELL - ID("GVG_028t")).on(
	lambda self, player, card, *args: (
		Give(player.opponent, card.id),
		Give(player, "GVG_028t")
	)
)
```

Almost fully declarative. There is no way to get the `card` argument dynamically, unfortunately. Yet. :)

A `Deathrattle()` action has also been added. It it used internally in place of the old `card.trigger_deathrattles()`.
It forced some cleanups related to the `EXTRA_DEATHRATTLES` tag, and allows us to implement
[Feign Death](http://hearthstone.gamepedia.com/Feign_Death) very elegantly:

```python
Deathrattle(FRIENDLY_MINIONS)
```

And finally, `TakeControl` has been renamed to
[`Steal`](https://github.com/jleclanche/fireplace/commit/639c4223c67cfb76818bc4c2176689f8ff01f74f).

Another change, this one in the engine itself, was to implement a
[`DISCARD` Zone](https://github.com/jleclanche/fireplace/commit/e6de4a8d46e9e5577b051943b1d049f8396ca51f).
This allows us to more easily implement a `KILLED` selector, which lets us make
[Resurrect](http://hearthstone.gamepedia.com/Resurrect) declarative:

```python
# Resurrect
class BRM_017:
	play = Summon(CONTROLLER, Copy(RANDOM(FRIENDLY + KILLED + MINION)))
```

Phew. That was a *lot* of changes.

This week's Tavern Brawl was
[very easy to implement](https://github.com/jleclanche/fireplace/blob/d551aad06175ab2f3d2686979a53a8c0b763be13/fireplace/brawls/__init__.py#L133-L151).
I thought it was a bit boring as a Tavern Brawl, but an excellent idea for a more "permanent" game mode.

But really, I am writing this to talk about the regular kind of Brawls.

[Dark Iron Bouncer](http://hearthstone.gamepedia.com/Dark_Iron_Bouncer) has been implemented, using a custom
`ALWAYS_WINS_BRAWLS` tag, which got its own selector. And now, the Brawl spell looks like this:

```python
# Brawl
class EX1_407:
	play = (
		Find(ALL_MINIONS + ALWAYS_WINS_BRAWLS) &
		Destroy(ALL_MINIONS - RANDOM(ALL_MINIONS + ALWAYS_WINS_BRAWLS)) |
		Destroy(ALL_MINIONS - RANDOM_MINION)
	)
```

[52 files changed, 1869 insertions(+), 1161 deletions(-)](https://github.com/jleclanche/fireplace/compare/8858890945e271f1428519c033f89386e9216bc3...5f9e111722d2185f3b9ccec65ffd774ef97338bd)

Jerome
