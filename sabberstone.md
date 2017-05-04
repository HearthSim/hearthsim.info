---
layout: page
title: Sabberstone - Hearthstone Simulator
permalink: /sabberstone/
---

**Sabberstone** is a Hearthstone simulator, written in [C# Net Core](https://www.microsoft.com/net/core).

<img align="left" src="https://github.com/HearthSim/SabberStone/blob/master/Readme/sabberstone.png">

I don't claim Sabberstone to be the best or whatever simulator out, but it is beeing activly worked on and I try to be in pair with the current Hearthstone version as much as I can. Sabberstone has always focused in implementing card mechanics the way they are described on [Hearthstone Gamepedia](http://hearthstone.gamepedia.com/Advanced_rulebook). Sabberstone includes a declarative task system to implement card mechanics, which makes it managable to catch up on new expensions or adventures. The main goal of developing Sabberstone was to offer an easy way for AI Dev's and Hearthstone addicts to play around with a simulator. Currently a basic game-tree search is implemented and can be challenged ...

<img align="center" src="https://github.com/HearthSim/SabberStone/blob/master/Readme/aigameplay.png">

Sabberstone ships a builtin [Kettle](/kettle/) server, which lets it communicate with the real Hearthstone client through [Stove](/stove/), or play games with the [Joust](/joust/) web interface.

[Source code](https://github.com/HearthSim/SabberStone)

<img align="center" src="https://github.com/HearthSim/SabberStone/blob/master/Readme/stove.PNG">
