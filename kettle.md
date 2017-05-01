---
layout: page
title: The Kettle Protocol
permalink: /kettle/
---

**Kettle** is a JSON-based protocol used to communicate game state and player
inputs for Hearthstone. It is closely modeled after the real Hearthstone
protocol, but does not use Protobufs.


## Goals

The main goal of Kettle is to be a portable, language-agnostic Hearthstone game
protocol.

This allows:

* Creating and playing games in [Stove](/stove/) and be able to play them from a
  simulator such as [Fireplace](/fireplace/) or Sabberstone.
* Implementing a Hearthstone AI in a different language/process as the simulator
  it runs on.
* Communicating games between [Joust](/joust/) and a Kettle-compatible simulator
  in order to play directly from a web browser.
