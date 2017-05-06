---
layout: page
title: Hearthstone Simulators
permalink: /simulators/
---

The HearthSim Developer Community has produced several different Hearthstone
simulators in various languages, with varying amounts of gameplay implemented
in each.


## Fireplace

Fireplace is a Python 3 simulator and one of the original HearthSim projects.
It capitalizes on the Hearthstone CardDefs XML files in order to stub most of
the game's cards and have a default implementation of all simple minions.
It also features an extremely extensive test suite and was used to create
the [Kettle protocol](/kettle/), in order to play simulated games online and
on the official client.

* [Main page](/fireplace/)
* [Source code](https://github.com/jleclanche/fireplace)


## Sabberstone

Sabberstone is a simulator written in [C# Net Core](https://www.microsoft.com/net/core).
It has currently more than 95% of the Standard Cards implemented (Year of the Mammoth).
Sabberstone has been developed to give Hearthstone addicts and AI Devs, a possibility
to implement fast AIs, an example game tree search is already implemented. Cloning in
any game state is possible. Sabberstone uses a simple declarative task system to
implement card mechanics. Sabberstone ships a builtin [Kettle](/kettle/) server, which
lets it communicate with the real Hearthstone client through [Stove](/stove/), or play
games with the [Joust](/joust/) web interface.

* [Main page](/sabberstone/)
* [Source code](https://github.com/HearthSim/Sabberstone)


## Hearthbreaker

Hearthbreaker is another simulator written in Python 3, with most cards implemented
up until Blackrock Mountain. It also includes a ncurses interface.
Along with Fireplace, it is another one of the original HearthSim projects.

It was used by the DeepMind team at Google for Hearthstone card generation.

This project is no longer maintained.

* [Source code](https://github.com/danielyule/hearthbreaker)
* [Latent Predictor Networks for Code Generation (Ling et al, 2015)](http://arxiv.org/pdf/1603.06744.pdf)


## HearthShroud

HearthShroud is a Haskell-based Hearthstone engine, including a playable console UI.

This project is no longer maintained.

* [Source code](https://github.com/thomaseding/hearthshroud)


## Soot

Soot was an attempt at building a Clojure-based Hearthstone Card DSL with a C engine.

This project is no longer maintained.

* [Source code](https://github.com/mischanix/soot)


## Brazier

Brazier was a Java approach to simulation, using a JSON-based card format.

This project is no longer maintained.

* [Source code](https://github.com/HearthSim/Brazier)


## Other simulators

### HearthSim

The HearthSim simulator is a Java imperative simulator and, ironically, not a
HearthSim project. Oyachai, its original author, has kindly
[allowed HearthSim to reuse the name](https://github.com/oyachai/HearthSim/issues/38),
which is where it came from.

This project is no longer maintained.

* [Source code](https://github.com/oyachai/HearthSim)
