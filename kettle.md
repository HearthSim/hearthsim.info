---
layout: page
title: The Kettle Protocol
permalink: /kettle/
---

**Kettle** is a JSON-based protocol used to communicate game state and player
inputs for Hearthstone. It is closely modeled after the real Hearthstone
protocol, but does not use Protobufs.

Currently, it is used by [Fireplace](/fireplace/) to create games and play from
[Stove](/stove/) servers. It is also supported by [Joust](/joust/) to allow for
playing games directly from a web browser.


## Structure

Every Kettle packet begins with an unsigned int32 which encodes the size of the
rest of the packet.

What follows is an UTF-8 JSON-encoded array, always of two items:

* A `Type` key, which contains the name of the packet type
* A key matching the name of the packet type, which contains the packet data.
