---
layout: post
title: Happy Feast of Winter Veil, Champion!
permalink: /blog/happy-feast-of-winter-veil-champion/
---

It has been two months since the [last Fireplace dev update](/blog/rip-grim-patron/).
Since then, we have reached over 2000 commits!

The past two months, we have implemented 178 new cards and added 77 new tests. Not even
accounting for all the bugs fixed and code cleanups.

* 178 new cards
* 77 new tests
* **All cards from Classic, Naxxramas, GVG, Blackrock and TGT implemented!**


## Features

The bootstrapping process has been greatly improved. The main `bootstrap` script is now
a polyglot script that will run on Windows, Linux and OSX alike. It automatically runs
`scripts/bootstrap.sh` or `scripts/bootstrap.ps1` depending on the available shell.

The bootstrapped data is now pulled directly from the fireplace.cards module. This means
it's now much cleaner to implement buffs, Choose Ones and such as they are no longer in
two different places. `CardDB` is now a class that implements the necessary merging
functionality.

Custom cards are now implemented with the `@custom_card` decorator, registering the class
as a new card to bootstrap. The `tags` attribute will be pulled in to the defaults.

This cleanup has allowed us to automatically gather all card scripts and set appropriate
defaults for missing attributes, greatly improving runtime performance. The removal of
the `data` module also let us enumerate Fireplace cardsets and run through all of them.

Tests have finally been split into multiple files. The decision was to create one file
for each card set, one for secrets and some extra files for related tests. Alongside the
`custom_card` decorator, this was used to re-implement the pre-nerf Warsong Commander,
which is used for the most reliable test cases on summon event timing.


## Engine changes

Damage handling has been fixed and is nearly final. Reorganizing the order of events,
broadcasts and damage reduction allows damage events to trigger even through armor,
such as for [Floating Watcher](http://hearthstone.gamepedia.com/Floating_Watcher).
The addition of Predamage allowed for Bolf Ramshield and Ice Block to be implemented,
the latter which also needed the new `Lethal()` evaluator.

Lord Jaraxxus is fully implemented at last, and faithful to secrets interactions in
Hearthstone. Ben Brode previously hinted that Jaraxxus has special code for interacting
with the on-minion-play secrets. I found this to be unnecessary as it works as expected
when using `Morph()`. The only necessary change was to allow Repentance, Sacred Trial and
Snipe to trigger when a *Hero* is played. The one exception is Mirror Entity, which needs
to summon the original minion when the hero is "played".

In this model, playing a card that morphs itself during its play action (Battlecry)
will trigger events with the result of the morph. It's consistent with the way Faceless
Manipulator triggers the appropriate on-summon events.

So here is the new Jaraxxus:

```py
# Lord Jaraxxus
class EX1_323:
	play = (
		Summon(CONTROLLER, "EX1_323h").then(Morph(SELF, Summon.CARDS)),
		Summon(CONTROLLER, "EX1_323w")
	)
```

And the new Mirror Entity:

```py
# Mirror Entity
class EX1_294:
	secret = [
		Play(OPPONENT, MINION).after(
			Reveal(SELF), Summon(CONTROLLER, ExactCopy(Play.CARD))
		),
		Play(OPPONENT, ID("EX1_323h")).after(
			Reveal(SELF), Summon(CONTROLLER, "EX1_323")
		)
	]
```

`Discover()` has been implemented. It is based on `GenericChoice()`, taking a picker
argument. The pickers are not yet powerful enough to do weights; this will have to be
taken care of at some point.


Other minor changes:

* Windfury is no longer a boolean value, it is treated as "additional attacks" instead,
  which is how Hearthstone treats it to implement Mega-Windfury.
* Attacks now trigger Attack.after() and durability hits have been moved there for
  Gorehowl's sake. This is used for Bear Trap.
* `Player.cant_overload` is checked before overloading, to implement an old version of
  Lava Shock.
* Hero Powers now track their activations per turn, no longer exhausting after one use.
* Double Damage/Healing (Prophet Velen) should now work exactly as intended.


## DSL Changes


### Subactions and Jousts

The biggest change in the DSL is the implementation of `Action.then()`. This implements
sub-actions without having to pass actions as arguments to other actions (which is now
deprecated). Doing it this way means we get arbitrary access to the parent action's
arguments. Here it is with Far Sight

```py
# Far Sight
class CS2_053:
	play = Draw(CONTROLLER).then(Buff(Draw.CARD, "CS2_053e"))
```

This is even used for the new Joust! Joust is no longer a mere evaluator, it is both
an action *and* an evaluator. To be more specific, it is an action (the "reveal"), which
has a sub-action with an evaluator on the action's arguments (the jousters):

```py
Joust(RANDOM(FRIENDLY_DECK + MINION), RANDOM(ENEMY_DECK + MINION)).then(
	JoustEvaluator(Joust.CHALLENGER, Joust.DEFENDER) & (...)
)
```

Doing it this way lets us cleanly implement King's Elekk:

```py
# King's Elekk
class AT_058:
	play = JOUST & Draw(CONTROLLER, Joust.CHALLENGER)
```


### Lazy Values, Selectors

Action arguments are no longer enum-based. Instead, they are subclasses of `ActionArg`,
which inherits from `LazyValue`. `LazyNum` is also a subclass, so wherever those were
usable, Action arguments are as well.
New `Controller()` and `Opponent()` methods are also based on LazyValue.

The new Lorewalker Cho, for example, uses `Opponent()` to be fully declarative:

```py
events = Play(ALL_PLAYERS, SPELL).on(Give(Opponent(Play.PLAYER), Copy(Play.CARD)))
```

Selectors have been slightly cleaned up. `FuncSelector` is now a base to implement `ID`,
`TARGET` and `LazySelector` which is used in Selector arithmetics with LazyValues.
Selectors are also now indexable. To get the first three entities from a selector, you
would do `<selector>[:3]`. This is used by both Poison Cloud and Tracking:

```py
# Tracking
class DS1_184:
	play = GenericChoice(CONTROLLER, FRIENDLY_DECK[:3])

# Poison Cloud
class NAX11_02:
	activate = Hit(ALL_MINIONS, 1).then(
		Dead(Hit.TARGETS) & Summon(CONTROLLER, "NAX11_03")
	)
```

Calling an `Attr()` with a selector will return an `AttrSelector()`. With some helpers,
this is how it can be used (Summoning Stone example):

```py
events = Play(CONTROLLER, SPELL).on(Summon(CONTROLLER, RandomMinion(cost=COST(Play.CARD)))
```

Or Molten Giant:

```py
# Molten Giant
class EX1_620:
	cost_mod = -DAMAGE(FRIENDLY_HERO)
```


### Other DSL changes

Secrets now use the `secret` script. That script behaves like events, but will never
actively listen during the controller's turn. `events` is still available and is used
for Competitive Spirit which *does* trigger during the Controller's turn.

The new `RandomID()` picker allows picking from a list of IDs. Most cards use entourage
instead but some, such as Tinkmaster Overspark, don't.

The `SetTag()` syntax has changed to default values to 1 (or 0 for `UnsetTag()`) and
helpers have been added for `GiveCharge`, `GiveDivineShield` and `GiveWindfury`.

[Reno Jackson](http://hearthstone.gamepedia.com/Reno_Jackson) required the implementation
of the `FindDuplicates()` evaluator. It could even be used to implement a `powered_up`
script for it.

`Steal()` now *optionally* takes a "new controller" argument, for the sake of
Shadow Madness. It might be made mandatory at some point, as the interaction with
[Djinni of Zephyrs](http://hearthstone.gamepedia.com/Djinni_of_Zephyrs) is important.

`Attacking()` is a new evaluator which is used in Gorehowl and Massive Runeblade. This
is Gorehowl:

```py
# Gorehowl
class EX1_411:
	update = Attacking(FRIENDLY_HERO, MINION) & Refresh(SELF, buff="EX1_411e")
	events = Attack(FRIENDLY_HERO, MINION).after(Buff(SELF, "EX1_411e2"))

EX1_411e = buff(immune=True)
EX1_411e2 = buff(atk=-1)
```

Fatigue now happens in the `Fatigue()` action. This should not matter for simulation
purposes, but it is needed as a game action for Stove.


New aliases: `FULL_HAND`, `FULL_BOARD`, `EMPTY_HAND` and `EMPTY_BOARD` . They are mostly
used in secrets, most of which should now only trigger in the same situations as
Hearthstone.
Lots of other new aliases: `REMOVED_IN_PLAY`, `ENEMY_CLASS`, `CLASS_CARD()`,
`HIGHEST_ATK()`, `LOWEST_ATK()`, `CONTROLLED_BY()`, `RandomMech`, `CURRENT_PLAYER` and
`CURRENT_HEALTH()`.


----

Well, I'm forgetting a lot. I'll leave it here though, this is more than enough for now.


[117 files changed, 10755 insertions(+), 8232 deletions(-)](https://github.com/jleclanche/fireplace/compare/0fa04a5f09f9fd9998e257e3f312d6986a7d1e47...67a286bd634cc94d7ef07d30903b3654b787b19d)

Jerome
