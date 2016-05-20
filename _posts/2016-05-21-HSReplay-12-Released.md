---
layout: post
title: HSReplay 1.2 Released
permalink: /blog/hsreplay-12-released/
---

HSReplay 1.2 has been released.

Changes since HSReplay 1.1:

* The `ChangeEntity` element has been introduced to support the `CHANGE_ENTITY`
  packet from 5.0.0.12574 (currently only used by Shifter Zerus).
* The `Action` element has been renamed to `Block`. Backwards compatibility for
  HSReplay 1.1 files should be considered, although such files should still be
  extremely rare.
* The enum for the Game `type` attribute has been clarified to be `BnetGameType`.
  Usage of the `GameType` enum is a bug and should be treated as such.


The DTD for HSReplay 1.2 format is available here:

<https://hearthsim.info/hsreplay/dtd/hsreplay-1.2.dtd>


Bonus content: I am also releasing the Python implementation
[on PyPI](https://pypi.python.org/pypi/hsreplay).
Run `pip install hsreplay` to install it.


Jerome
