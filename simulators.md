---
layout: page
title: Hearthstone Simulators
permalink: /simulators/
---

The HearthSim community has produced several different Hearthstone simulators
in various languages, with varying amounts of gameplay implemented in each.


## Fireplace

Fireplace is a Python 3 simulator and one of the original HearthSim projects.
It capitalizes on the Hearthstone CardDefs XML files in order to stub most of
the game's cards and have a default implementation of all simple minions.
It also features an extremely extensive test suite and was used to create
the [Kettle protocol](/kettle/), in order to play simulated games online and
on the official client.

* [Main page](/fireplace/)
* [Source code](https://github.com/jleclanche/fireplace)


## Brimstone

Brimstone is a high performance C# simulator inspired by Fireplace. It was
created to iterate on Fireplace's design and overcome the performance constraints
of Python.

It also features a Kettle interface and is actively being developed.

* [Main page](/brimstone/)
* [Source code](https://github.com/HearthSim/Brimstone)


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
[allowed the HearthSim community to reuse the name](https://github.com/oyachai/HearthSim/issues/38),
which is where it came from.

This project is no longer maintained.

* [Source code](https://github.com/oyachai/HearthSim)
