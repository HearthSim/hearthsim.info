---
layout: page
title: Sabberstone - Hearthstone Simulator
permalink: /sabberstone/
---

**Sabberstone** is a Hearthstone simulator, written in [C# Net Core](https://www.microsoft.com/net/core).

<img align="left" src="https://github.com/HearthSim/SabberStone/blob/master/Readme/sabberstone.png">

Sabberstone is activly worked on and I try to be in pair with the current Hearthstone version as much as I can. Sabberstone has always focused in implementing card mechanics the way they are described on [Hearthstone Gamepedia](http://hearthstone.gamepedia.com/Advanced_rulebook). Sabberstone includes a declarative task system to implement card mechanics, which makes it managable to catch up on new expensions or adventures. The main goal of developing Sabberstone was to offer an easy way for AI Dev's and Hearthstone addicts to play around with a simulator. Currently a basic game-tree search is implemented and can be challenged ...

Sabberstone facts ...

* supports cloning
* calculating all available options
* declarative task system for card mechaninc
* example game tree search implementation
* connecting with the official client [Stove](/stove/)
* easy logging
* 700+ unittest for cards and gamemechanincs

Basic => 100% from 142 Cards
Classic => 96% from 239 Cards
Whispers of the Old Gods => 93% from 134 Cards
One Night in Karazhan => 95% from 45 Cards
Mean Streets of Gadgetzan => 96% from 132 Cards
Journey to Un'Goro  => 86% from 135 Cards
**Total Standard => 94% from 827 Cards**

Blackrock Mountain => 96% from 31 Cards
Goblins vs Gnomes => 7% from 123 Cards
Hall of Fame => 60% from 10 Cards
Curse of Naxxramas => 3% from 30 Cards
The League of Explorers => 97% from 45 Cards
The Grand Tournament => 92% from 132 Cards
**Total Wild => 83% from 1198 Cards**

<img align="center" src="https://github.com/HearthSim/SabberStone/blob/master/Readme/aigameplay.png">

Sabberstone ships a builtin [Kettle](/kettle/) server, which lets it communicate with the real Hearthstone client through [Stove](/stove/), or play games with the [Joust](/joust/) web interface.

[Source code](https://github.com/HearthSim/SabberStone)

<img align="center" src="https://github.com/HearthSim/SabberStone/blob/master/Readme/stove.PNG">
