---
layout: post
title: A Switch Statement for Fireplace
permalink: /blog/a-switch-statement-for-fireplace/
---

The latest Tavern Brawl, "An Evil Exchange", is really cool. It introduces several new
cards with interesting mechanics.

One of them, "Uncover Staff Piece", is a card that works a lot like Shadowform: It
updates the player's Hero Power with a different one, depending on which one is
currently in play.

This is where I realized that Shadowform and Justicar Trueheart could be solved in the
DSL by introducing a simple Switch statement. Instead of messing around with `Find()`
and nested else clauses, which is possible but looks awful.

So [we got one](https://github.com/jleclanche/fireplace/commit/9ee5b036dc3d822b7b74cdd5cd3c8081c0a498c7).

This is the new Shadowform:

```py
play = Switch(FRIENDLY_HERO_POWER, {
	"EX1_625t": Summon(CONTROLLER, "EX1_625t2"),
	"EX1_625t2": (),
	None: Summon(CONTROLLER, "EX1_625t"),
})
```

The first argument to `Switch()` is a selector, which must evaluate to either 1
entity or none at all (otherwise, it will error out as unsupported). Luckily, it is not
possible to have more than one `FRIENDLY_HERO_POWER` in play.

The second argument is a map between a card ID and a list of actions. The Switch
statement will look for the found entity's ID, performing the matching actions when
triggered.
`None` is a special key which contains the default case. If there is no entity, or the
found entity does not match any key, the action in `None` will be performed. Without
a None key, no action will be performed by default.

It is also possible (as evidenced in the `EX1_625t2` case, which is "upgraded twice")
to specifically perform no action in a case, allowing for a non-null default case with
specific null outcomes.


### Bootstrapping

In other news, Fireplace's bootstrapping process has been entirely removed. This is the
culmination of weeks of work, greatly simplifying the installation process. The Python
Hearthstone library is now on [PyPI](https://pypi.python.org/pypi/hearthstone/), which
means it can be installed directly from pip. The released versions actually include the
latest `CardDefs.xml` file. Useful! Installing Fireplace will soon be as simple as
`pip install fireplace`.


### Game loop rewrite

The next big chunk of work is going to be a rewrite of the game loop. Details are in
[#329](https://github.com/jleclanche/fireplace/issues/329).

When a choice card is played, the game loop is interrupted until the choice input resolves.
This means that, for example, when playing a Discover card with a Knife Juggler on the
board, the knife will trigger **after** the Battlecry completes, which includes the
resolution of the choice. In fireplace, the battlecry will finish without waiting for the
choice - but fireplace will prevent the user from performing further actions on the game.

A more powerful implementation of the Choice mechanic is blocked by this. Eye of Orsis
(`LOEA16_13`) most notably requires such an implementation:
The resolution of the choice is needed to complete the play action (the remainder of the
play action being "give the player two more copies of the picked card").

A tick-based loop would also potentially simplify the Kettle server, defining clearly
when to check for updates.

[52 files changed, 671 additions(+), 454 deletions(-)](https://github.com/jleclanche/fireplace/compare/5316f18cc5e7dbaf003f7fccd3cc52f9c7b9e5d4...0edc39f9e0956ee41bb0a43b9358b6fa7d921a38)

Jerome
