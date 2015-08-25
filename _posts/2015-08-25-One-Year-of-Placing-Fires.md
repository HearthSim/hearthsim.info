---
layout: post
title: One Year of Placing Fires
permalink: /blog/one-year-of-placing-fires/
---

Today marks the one year anniversary of Fireplace's first commit.

1461 commits later, [Mulligans have finally been implemented](https://github.com/jleclanche/fireplace/commit/fe3edd0926f8d9245a190e5d113283e2270460ce)...

About time, huh?

Mulligans set a `choice` variable on the player. If that variable is set,
ending the turn or performing any action will result in an error.

The `choice` variable is an action (a `MulliganChoice`, specifically). It has
a `cards` attribute which contains the list of cards that can be picked.
To perform the mulligan, call `player.choice.choose(card1, card2, ...)`.
This will *first* draw an amount of cards equal to the amount of chosen cards,
and then shuffle the chosen cards into the deck (therefore, the chosen cards
will never be re-drawn).

Calling `choose()` with no arguments will perform an empty mulligan (keep all cards).

[Jousting has also been implemented](https://github.com/jleclanche/fireplace/commit/3e5df389a4d1c4e23cd836cf7ac758c7e1d695d3),
using the following syntax:

```python
Joust(FRIENDLY + MINION + IN_DECK, ENEMY + MINION + IN_DECK) & Buff(SELF, ...)
```

The classic joust is aliased to `JOUST` to help readability and avoid repetition.

[Auras have been rewritten again](https://github.com/jleclanche/fireplace/commit/ce1810146d3eae90096496ff7c393e43fa2d4370).
They are completely gone from the CardDefs.xml file and are now action-driven instead.
This makes them much easier to implement and also paves the way for attribute scripts
to become auras as well. I'll be very sad to see them go, but the action/selector
system is just *so much more flexible*.


### The Grand Pack Analysis

The Grand Tournament is out!

Yesterday, I [posted about a pack analysis](https://www.reddit.com/r/hearthstone/comments/3i2que/how_to_track_your_pack_openings_for_tomorrows_tgt/)
we intend to run over crowdsourced data of the TGT packs. In the 12 hours since TGT has come out,
we have had over three hundred submissions including over eleven thousand packs!

Fluxflashor has [already set up a website](http://fluxflashor.net:8181/games/hearthstone/card-packs/)
that allows for automatic processing of submissions and viewing the submitted data.

The data is pouring in and the next post on this blog will be a short analysis
on the set, as well as the raw CSV data and the source code used to generate it.
The analysis will be cross-posted to both [Hearthpwn](http://www.hearthpwn.com/)
and [/r/Hearthstone](https://www.reddit.com/r/hearthstone).


### Kettles and Stoves

Work on matchmaking in Stove is progressing at a very fast pace.
The [first Kettle commit](https://github.com/jleclanche/fireplace/commit/37eb1a356634c460bf43f27d69ef79ed7434ba85)
(previously known as Firesim) is in the Fireplace tree, right on time for the
anniversary.


### AGPLv3+ relicensing

Both Fireplace and Stove have been relicensed from GPL3 to the
[Affero GPLv3](http://choosealicense.com/licenses/agpl-3.0/).

[65 files changed, 3471 insertions(+), 1412 deletions(-)](https://github.com/jleclanche/fireplace/compare/236911a82dce0b59477a8422e055cd47d370a270...fe3edd0926f8d9245a190e5d113283e2270460ce)

Jerome
