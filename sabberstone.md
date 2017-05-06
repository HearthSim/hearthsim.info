---
layout: page
title: Sabberstone - Hearthstone Simulator
permalink: /sabberstone/
---

**Sabberstone** is a Hearthstone simulator, written in [C# .Net Core](https://www.microsoft.com/net/core).

Sabberstone is activly worked on. It has always focused in implementing card
mechanics the way they are described in the
[Advanced Rulebook](http://hearthstone.gamepedia.com/Advanced_rulebook).

Sabberstone includes a declarative task system to implement card mechanics,
which makes it managable to catch up on new expensions or adventures.
The main goal of its development is to offer an easy way for AI developers and
Hearthstone enthusiasts to play around with a simulator.

Sabberstone supports:

* Game cloning
* Calculating all available options
* A declarative task system for card mechanics
* Game tree search
* Connecting to [Stove](/stove/)

Implementation status (as of UNG):

* 94% Standard set
* 83% Wild sets
* Hundreds of unit tests for cards and game mechanics

Sabberstone ships a builtin [Kettle](/kettle/) server, which lets it communicate
with the real Hearthstone client through [Stove](/stove/), or play games with
the [Joust](/joust/) web interface.

[Source code](https://github.com/HearthSim/SabberStone)
