---
layout: post
title: Shuffling, shuffling...
permalink: /blog/shuffling-shuffling/
---

The latest action I had to implement is `Shuffle()`. As in, "Shuffle a card into a deck".
As of patch 2.7, there are 5 cards that make use of it:

 - [Malorne](http://hearthstone.gamepedia.com/Malorne)
 - [Recycle](http://hearthstone.gamepedia.com/Recycle)
 - [Iron Juggernaut](http://hearthstone.gamepedia.com/Iron_Juggernaut)
 - [Gang Up](http://hearthstone.gamepedia.com/Gang_Up)
 - [Hand to Deck](http://hearthstone.gamepedia.com/Hand_to_Deck) (a cheat card)

This is a two target action. We need a card target (the card that will be shuffled),
and a player target (whose deck it will go in). The card target is interesting, because of the three use cases it supports.

Malorne and Recycle were straightforward.
The Hand to Deck logic was simple as well, as targeting an entire hand is very simple:

```python
# Hand to Deck
class XXX_042:
	action = [Shuffle(TARGET_PLAYER, IN_HAND + CONTROLLED_BY_TARGET)]
```

Iron Juggernaut was more fun, because we implement shuffling a card we just created, just like `Summon()` works:

```python
# Iron Juggernaut
class GVG_056:
	action = [Shuffle(OPPONENT, "GVG_056t")]
```

Gang Up, however, doesn't shuffle a card but *copies* of a card.
I could have written it procedurally, but it pushed me to implement a `Copy()` evaluator, which was on the TODO list
for cards such as Thoughtsteal and Mind Vision.
This is the final version of Gang Up:

```python
# Gang Up
class BRM_007:
	action = [Shuffle(CONTROLLER, Copy(TARGET)) * 3]
```

Pretty!

`Copy()` is actually used in a lot of cards. Mind Vision and Thoughtsteal create simple copies:
the cards aren't in play, they don't retain their buffs, etc.
Mirror Entity and Faceless Manipulator create *deep copies* of a card:
the cards retain all their buffs and extra tags (damage, silence, ...).
I decided not to implement deep copies for now. I still haven't decided whether it should be a separate action or not.

The Copy action greatly simplified existing cards. Let's look at the old Thoughtsteal:

```python
# Thoughtsteal
class EX1_339:
	def action(self):
	deck = self.controller.opponent.deck
	cards = random.sample(deck, min(len(deck), 2))
	return [Give(CONTROLLER, card.id) for card in cards]
```

This is now:

```python
class EX1_339:
	action = [Give(CONTROLLER, Copy(RANDOM(OPPONENT_DECK + MINION) * 2))]
```

In other words, we `Copy [2 Random [Minions in the opponent's deck] ]`.
This is where being able to specify random targets matters.
Remember that if the opponent only has one card in their deck, Thoughtsteal will only give that one card.
If we went the other way, and used `[Give(CONTROLLER, Copy(RANDOM(OPPONENT_DECK + MINION))) * 2]`
(notice the subtle difference), then we would give *one* random minion, *twice*, which breaks in the "one card remaining" case.

Let's look at [Mindgames](http://hearthstone.gamepedia.com/Mindgames), which was greatly simplified as well.
This is the old one:

```python
# Mindgames
class EX1_345:
	def action(self):
		creatures = self.controller.opponent.deck.filter(type=CardType.MINION)
		if creatures:
			creature = random.choice(creatures).id
		else:
			creature = "EX1_345t"
		return [Summon(CONTROLLER, creature)]
```

Which became:

```python
class EX1_345:
	action = [Summon(CONTROLLER, Copy(RANDOM(OPPONENT_DECK + MINION) | "EX1_345t"))]
```

This is similar to thoughtsteal, but notice that `| "EX1_345t"`?
That's `__or__` on the `RANDOM` selector, implemented for the occasion.
A fallback if the selector comes up empty.

Echo of Medivh was the last item on the list.
It forced me to implement *multi-targeting* for the `Copy` evaluator, as I did not want to have to iterate over
the entire field. And there we have it:

```python
# Echo of Medivh
class GVG_005:
	action = [Give(CONTROLLER, Copy(FRIENDLY_MINIONS))]
```

[12 files changed, 141 insertions(+), 49 deletions(-)](https://github.com/jleclanche/fireplace/compare/d79c1e10e68c625da910ee1bca3f32a4516fa479...56b97a3da978513a03ff291e43f10dbe759bd8d1)

Jerome
