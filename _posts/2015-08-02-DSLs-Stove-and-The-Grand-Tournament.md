---
layout: post
title: DSLs, Stove and The Grand Tournament
permalink: /blog/dsls-stove-and-the-grand-tournament/
---

Another very busy week in Fireplace!
New contributor @beheh is joining us and already contributed dozens of new tests.

Part of that work involved implementing an easy way to
[create an "empty" game](https://github.com/jleclanche/fireplace/commit/48870e0088ee2c9924c240cff57bc9a7857adc76)
which would start with empty decks and prevent fatigue. This allows for easily
testing draw-based events such as [Malorne](http://hearthstone.gamepedia.com/Malorne).


### The Grand Tournament

[A new expansion has been announced](http://thegrandtourney.com)!
With a new keyword: [Inspire](http://hearthstone.gamepedia.com/Inspire)!

Well, turns out the `INSPIRE` GameTag was already in the game and all I had to do was
[implement it](https://github.com/jleclanche/fireplace/commit/43743e6f4af23ce240af927d611ec0bbf840a6f5).

So that's done. Most of the announced cards are done, as far as non-static data
goes anyway.


### DSL changes

Contributed by @zakum42, the
[RandomNumber LazyNum](https://github.com/jleclanche/fireplace/commit/5c183f8dea0adfe9072f28147abfbeb4e27ec99f)
which allows for elegantly implementing cards such as
[Lightning Storm](http://hearthstone.gamepedia.com/Lightning_Storm):

```python
play = Hit(ENEMY_MINIONS, RandomNumber(2, 3))
```

The `Attr()` LazyNum has gained comparison capabilities, which turn it into an
Evaluator. This can be used to implement cards which behave differently based
on the total of an attribute, such as [Mortal Strike](http://hearthstone.gamepedia.com/Mortal_Strike):

```python
play = (Attr(FRIENDLY_HERO, "health") <= 12) & Hit(TARGET, 6) | Hit(TARGET, 4)
```

The `ExactCopy()` picker has been [implemented](https://github.com/jleclanche/fireplace/commit/fe9834c6f09e27d0ed0d2f63d07ca78e6fb94fcd).
It functionally works like `Copy()`, but recreates buffs, tags etc.
[Faceless Manipulator](http://hearthstone.gamepedia.com/Faceless_Manipulator)
is very elegant:

```python
play = Morph(SELF, ExactCopy(TARGET))
```

The `Counter()` action, used by [Counterspell](http://hearthstone.gamepedia.com/Counterspell),
has been [implemented](https://github.com/jleclanche/fireplace/commit/47f7ae1d9a4290be1a93da8de8f4d0010386b6d6)
as well. As it turns out, all it does is set a `CANT_PLAY` tag on the card, which
[prevents its play action from triggering](https://github.com/jleclanche/fireplace/commit/c673274fc3d6e63e1e3a7251112c104f8850bc75).
The [Wild Pyromancer](http://hearthstone.gamepedia.com/Wild_Pyromancer) interaction
does not happen like in Hearthstone, however, so that will have to be fixed.

```python
events = Play(OPPONENT, SPELL).on(Counter(Play.Args.CARD), Reveal(SELF))
```

Another new action: `UnlockOverload()`, for [Lava Shock](http://hearthstone.gamepedia.com/Lava_Shock).
Not much to say about that one.

There were two important organizational cleanups regarding the DSL.
The first one that hit was
[moving it to fireplace.dsl](https://github.com/jleclanche/fireplace/commit/9236776a6dbd1fd011d4b19be987cbbcaf89e916).
This forced clearing up some vocabulary on what is an Evaluator, a Picker etc.
Everything is available from the root of the module, but it's now subdivided like this:

* `fireplace.dsl.evaluator`: `Evaluator`, `Dead()`, `Find()`
* `fireplace.dsl.lazynum`: `LazyNum` and `LazyNumEvaluator`, `Attr()`, `Count()`, `RandomNumber()`
* `fireplace.dsl.picker`: `Picker`, `Copy()`, `ExactCopy()`, `RandomCardPicker()`
* `fireplace.dsl.selector`: All the selectors and their logic

The other significant cleanup was
[getting rid of `source, game` pairs](https://github.com/jleclanche/fireplace/commit/5435a705e29a58c9c74fb35adac5a7a414088c24)
in favour of just `source` and reusing `source.game`.


### Engine and simulation

On the game simulation side,
[Play processing has been redone](https://github.com/jleclanche/fireplace/compare/699d724c80c4b7c864729e2464bfffe56cb9b1fb...ebe2012112205bf6992b6a9fa11c9d4c71a0c08d).
This is possibly its fourth major rewrite. I am happy with the results, although
it looks like to comply with Hearthstone, I have to
[pause aura updates](https://github.com/jleclanche/fireplace/commit/b0a126b5f76beb866207a68567dde26742a68f92).
I don't think this makes any sense but it does look like Patashu is correct and
there is no way around it: Auras don't update during Play.

Finally, Attack/Health swaps are now [handled in-engine](https://github.com/jleclanche/fireplace/commit/4382272f8f0d8b9c83e038128da4c04abe5369d8).
I'm not actually a fan of this, but it seems like Hearthstone loves that mechanic,
so it's simpler that way.

The two new brawls, [Heart of the Sunwell](https://github.com/jleclanche/fireplace/commit/142d6dc0088b2ea79c778d2ed5d21403a9044b86)
and [Too Many Portals!](https://github.com/jleclanche/fireplace/commit/f86edf59a7c111845e9e75db76da80cb52856be7)
are also done. They were not particularly hard. The former looks a lot like my BaseTestGame class. :)


### Other repositories

The biggest cleanup this week by far has been removing the `hs-cards` submodule.
Submodules in git kind of suck (a lot). Chugging it around created its fair share
of problems, especially since all the static data changes were going in that
repository. That meant that when you wanted to implement a new card, you had to
send a pull request to two separate repositories. Urgh.

Well, that's gone. Static data is now in
[`fireplace/cards/data/`](https://github.com/jleclanche/fireplace/tree/master/fireplace/cards/data)
and all the post-processing that goes with it. Even
[Hero Power associations](https://github.com/jleclanche/fireplace/commit/5bae1857592bded1a60d7cb12c851632782f9e41)
are now automatically detected from the static files, where they previously had
to be manually assigned.

We now use a different repository, [hs-data](https://github.com/hearthsim/hs-data).
This one contains normalized, cleaned up files from the game, both DBF and CardDefs.
Each patch is a commit, and each commit is tagged by its build number. So if you
wanted to see the diffs from build 9554, you could
[look at the tag directly](https://github.com/HearthSim/hs-data/commit/9554).

The extraction scripts used to generate that repository are available in the
[HearthSim/extract-scripts](https://github.com/HearthSim/extract-scripts) repository.
I even had to update my [StormLib Python bindings](https://github.com/HearthSim/python-mpq)
for the occasion, so I moved them to the HearthSim organization as well.

Most of all this work comes from the needs of [Stove](https://github.com/HearthSim/stove),
the Hearthstone server @mischanix and I are currently working on. I am really happy with
the progress on it. We have a lot of the main menu implemented, including collection
management and booster packs. Everything is running on top of a SQLite database which
automatically imports most of its contents from the aforementioned hs-data DBFs.

What a month July was.

[71 files changed, 4282 insertions(+), 1118 deletions(-)](https://github.com/jleclanche/fireplace/compare/7fd1c00cef8e1d7b7605184d43691b69c2926a69...236911a82dce0b59477a8422e055cd47d370a270)

Jerome
