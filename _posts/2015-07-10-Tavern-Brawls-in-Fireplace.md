---
layout: post
title: Tavern Brawls in Fireplace
---

This has been a fun couple of weeks with commits from two new contributors!
I'm very happy about the generally positive feedback on the quality of Fireplace. I even wrote some
[contributing guidelines](https://github.com/jleclanche/fireplace/commit/d2f8f5a40ee024936177aadad5bbdea04f8be3c1)
for the occasion.

Since [Tavern Brawls](http://hearthsim.info/Tavern-Brawls-1000-commits/) have come out,
I have been focusing on separating rules from the Game object itself.
[14f7e61](https://github.com/jleclanche/fireplace/commit/14f7e619f4149e69d87e486de63ce160921000ed)
begins the separation by creating a BaseGame object and removing The Coin (random start) and Mulligan from it.

The default Game object is now declared as `Game(MulliganRules, CoinRules, BaseGame)`.
This is one of the rare times where mixins actually shine.

It's very elegant, but still not ideal. I would much prefer a system where I can declaratively write rules
for the Game object, just like I write them for regular Cards. Brawls could reuse such a system as well.


The first three Brawls are now implemented:

 - [Showdown at Blackrock Mountain](https://github.com/jleclanche/fireplace/commit/bd51ecb5247ffb5719d540d840cbb1c66f8fa67c)
 - [Banana Brawl!](https://github.com/jleclanche/fireplace/commit/7c1f8e2c8f5f5f166763c2c4532f0f06b5925181)
 - [Spiders, Spiders EVERYWHERE!](https://github.com/jleclanche/fireplace/commit/8858890945e271f1428519c033f89386e9216bc3)

None of them was particularly hard once the mechanics for them were in place.
Banana Brawl was the trickiest of the bunch, requiring a slight
[rework of death preparation logic](https://github.com/jleclanche/fireplace/commit/23ca9a8a33c2a308aa6f92a54dfe8474cd38ee48)
to allow for subclassing.
In addition, I had to
[implement caching in `RandomCardGenerator`](https://github.com/jleclanche/fireplace/commit/f022ced67eebe34cb10d12fe2d2b0c37c35192c7)
so that I could simply implement the "random banana" logic as a `RandomBanana` evaluator:

```python
class RandomBanana(RandomCardGenerator):
	cards = ("EX1_014t", "TB_006", "TB_007", "TB_008")
```

Since `cards` is a property on RandomCardGenerator, I could just override it with a static list.
It's worth noting that in the real Banana Brawl, the picks are *probably* weighted.
This would still be very easy to do, by overriding the `pick()` method which simply calls `random.choice()`
in the default implementation.

As a sidenote, the [Wild Magic](http://hearthstone.gamepedia.com/Wild_Magic) Hero Power was the original reason
why I started working on [Shuffle and Copy](http://hearthsim.info/Shuffling-shuffling/).
Even though they don't look related at first glance, down the line, they led to the implementation of
[recursive actions](https://github.com/jleclanche/fireplace/compare/706b381f2e3f...9fc8931e51bb) which I used
for Unstable Portal, and now Wild Magic.

Week 4 is currently running. Near-unanimously acclaimed as the most fun Brawl yet. I'm excited to implement
it in Fireplace, though I am running up against the issue of intercepting `Play` actions. I'll figure it out.

In unrelated news, the codebase has been moved to `under_score`-style variable/method naming, to align with
[PEP8](https://www.python.org/dev/peps/pep-0008/). While I don't agree with all its recommendations, naming
style is something I believe should align as much as possible with the official language style.
That move accounts for a huge part of the diff below.

[50 files changed, 2450 insertions(+), 2177 deletions(-)](https://github.com/jleclanche/fireplace/compare/d9e5c57c2d98553ab1b32d907c23e1b15a0d6510...8858890945e271f1428519c033f89386e9216bc3)

Jerome
