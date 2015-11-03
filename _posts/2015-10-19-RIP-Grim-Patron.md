---
layout: post
title: RIP Grim Patron
permalink: /blog/rip-grim-patron/
---

After several months of high activity on Fireplace, things have slowed down a little.

I have been quite busy preparing a move to Greece, which left me little time to update
the blog or do further work on Stove. However, there has still been a lot of activity
throughout HearthSim.


### HearthSim projects

Most recently, both [HearthstoneJSON](https://github.com/hearthsim/hearthstonejson) and
[Hearthstone Deck Tracker](https://github.com/Epix37/Hearthstone-Deck-Tracker) have
joined our ranks.
In addition, I have also moved the [python-bna](https://github.com/jleclanche/python-bna)
project, a Python implementation of the Battle.net Authenticator, to HearthSim ownership.

We have also opened an "official unofficial" issue tracker for Hearthstone:
[HearthSim/hs-bugs](https://github.com/HearthSim/hs-bugs/). It lets us keep track of
bugs using a much  saner interface than a... wiki. Incidentally, it has proven itself
quite popular since it allows for easy references to known issues and lets us track
whether bugs have been fixed and if so, when.

[**@Xinhuan**](https://github.com/Xinhuan) has created a
[CardBot](https://github.com/hearthsim/cardbot) for the IRC channel. It allows quickly
finding details on cards with `!card <id>`, `!card <name>` or `!card <partial-match>`.
[Join our channel](/about) to try it out! :)

With the help of [**@Epix37**](https://github.com/Epix37), we have done a lot of work on
the [HSReplay](https://github.com/hearthsim/HSReplay) spec which I have just finished
licensing as CC0 (implementations MIT). At this point, they are essentially complete and
heavily battle-tested. This means they will be bumped to 1.0 very soon, which will
feature an official announcement on this blog.

Due to needs in other projects (HSReplay specifically), the Hearthstone enums have been
separated out of Fireplace and into a python library of its own:
[python-hearthstone](https://github.com/hearthsim/python-hearthstone). The package is
[semantically versioned](http://semver.org/) with the Hearthstone build as PATCH number.
This allows for both releasing changes in the package on multiple HS builds as well as
supporting new builds without any other change in the code.


### Fireplace work

Activity on Fireplace died down mid-september, but I have been trying to squeeze in some
minor work as regularly as possible.

The Kettle test games have highlighted several issues in the game logic which could not
be caught with everyday usage or testing. For example, `weapon.exhausted` would always
be True on the opponent's turn [regardless of their Zone](https://github.com/jleclanche/fireplace/commit/af63f5618b76145c1543792eefa25b484bc83d2b),
We caught this because Kettle has to update tags on all entities every game tick, so it
would send loads of unnecessary `TAG_CHANGE` packets for `EXHAUSTED` every turn.

Another fun bug was [Give() ignoring the hand limit](https://github.com/jleclanche/fireplace/commit/f2f2eec47578e0e45e209e858eece356ab13a92c).
There's a screenshot of this somewhere...

We also [resolved issues with targeting checks](https://github.com/jleclanche/fireplace/commit/3024b43cd2f615852305ff61e73e214b15ccdb98).
More specifically, cards that didn't have a target would accept *any* target and
subsequently ignore it, which meant that Hearthstone would show a targeting arrow for
eg. [Life Tap](http://hearthstone.gamepedia.org/Life_Tap). This also occured on
[Battle Rage](https://github.com/HearthSim/hs-bugs/issues/131) and
[Tinker's Sharpsword Oil](https://github.com/HearthSim/hs-bugs/issues/150) which
both include `REQ_MINION_TARGET` but no actual targeting requirement, probably as an
artifact of previous versions of the spells.

In the quality of life category, the logging system
[has been improved](https://github.com/jleclanche/fireplace/commit/0c62393a1cd613bede40ef93decf9eabf100af4d)
and made much more readable.

The [implemented.py script](https://github.com/jleclanche/fireplace/blob/master/tests/implemented.py)
hasi also gained a lot of functionality which makes it a lot more accurate. It will now
output the % of implemented cards. Are you curious? It's *92%*! Taking into account
that most of the missing ones are adventure or unused cards, I'm very proud of that
number.
With *The Grand Tournament*'s release, I ended up pushing to implement all the cards that
could be "dry-coded". This means we are missing a lot of tests, but at least they are
usable and can catch issues.

Some [slots reworking](https://github.com/jleclanche/fireplace/commit/cfb0ead04e40dc06641e328a99b4aa546f0950ea)
has been leading towards a rework of buffing. This is in fact part of a push to get rid
of the CardXML pre-processing, which has been detrimental to the out-of-the-box
experience, especially on Windows. The latter was helped a lot when
[**@liujimj**](https://github.com/liujimj) contributed a
[Powershell bootstrap script](https://github.com/jleclanche/fireplace/commit/5fd3b1c149247c98bf8dd9423f34b26f8940e591).

In another "Really? It took that long?" twist, playing minions at an index has now been
[implemented](https://github.com/jleclanche/fireplace/commit/c5fa2ebe100811487024b7878156005cb585f77f).
It is a product of continuous design: Work long enough on a project with a hard feature
in mind, and the feature will eventually materialize itself.

Finally, delayed event triggering is a new model [**@Patashu**](https://github.com/Patashu)
and I have been testing. I am very happy with it and have implemented it in Fireplace
for [Heal()](https://github.com/jleclanche/fireplace/commit/e6832a81c7d7127a6e6b3b0734c48427507f8c63).
Damage still has to be implemented but there is some design work to finish on
Predamage first (for Ice Block and Bolf, and I suspect Divine Shield too).
Deaths will also move to that system once I'm happy with how it works.


#### DSL changes

The biggest change by far has been the
[fifth Aura API](https://github.com/jleclanche/fireplace/commit/61f87cf4163f740f6475d0966cf1b76c3b25957b).
It was motivated by both Kettle and the bootstrap pains. Having "real" cards use custom
cards as their buffs meant crashes in the Hearthstone client. It could be filtered out
in Kettle but it's much easier to get rid of most of them; this move took a lot of
complexity out of creating cards that have their own auras. It also highlighted how easy
it is to model certain more complex cards under the aura model.
For example:

* [Nozdormu](https://github.com/jleclanche/fireplace/commit/32de3610d3I1aec71ef4848791118e2c95ce96d79)
* [The new Shadowform](https://github.com/jleclanche/fireplace/commit/18f0784b333797449c3f2d257764cbc3fef300ba)

`Retarget()` has been [implemented](https://github.com/jleclanche/fireplace/commit/6e41183f2f5f27276a9f558312be53ddc237c87f).
It it used for both [Noble Sacrifice](https://github.com/jleclanche/fireplace/commit/f0203499486ab6b3a4e5fb8726fc328a28c90e09)
and [Spellbender](https://github.com/jleclanche/fireplace/commit/4435b5df45179f938296cbfe499c9a6b3deb0262).

`Buff()` now [accepts `**kwargs`](https://github.com/jleclanche/fireplace/commit/333207d3ba4489fae95cbaf4f5b48681e086b5f1).

[**@beheh**](https://github.com/beheh) reworked mana gains and implemented the
[`GainEmptyMana()` action](https://github.com/jleclanche/fireplace/commit/70db40ccf5d73336ad1fe16fc9343c3b970aea6b).
This removes the need to call `FillMana()` after `GainMana()`. Instead, `GainMana()`
stands for "Gain a Mana Crystal" and `GainEmptyMana()` stands for "Gain an empty Mana
Crystal".

The new [`CurrentPlayer()` evaluator](https://github.com/jleclanche/fireplace/commit/14d4e9f3acf8d2f6f1782e1f3337c5635bb8aaa0)
will return True iff the controller is the current player, which finally allows for
[Worshipper's implementation](https://github.com/jleclanche/fireplace/commit/daf8ef39b8b66a008ff27e26991fda977288b1b0)
with the new aura API:

```python
class NAX2_05:
	update = CurrentPlayer(CONTROLLER) & Refresh(FRIENDLY_HERO, {GameTag.ATK: +1})
```

Two new card scripts:

* [`draw`](https://github.com/jleclanche/fireplace/commit/cfbd461f66d4ae343a2c24a551bee3689ee12dfc),
  for actions triggered when the card is drawn (Flame Leviathan etc).
* [`powered_up`](https://github.com/jleclanche/fireplace/commit/8739d8667b99c9959e53de72ce26729f1513d76a),
  an evaluator which checks whether the card is `POWERED_UP`. This replaces the nasty
  old PowerUpRequirements mechanism.

The `cost` script has also been
[replaced by `cost_mod`](https://github.com/jleclanche/fireplace/commit/5c5691e103d34a960eecf1c14f62393f80a6975f)
which understands LazyNums.

Three new helpers:

* [`COINFLIP`](https://github.com/jleclanche/fireplace/commit/506ac0904b4d661c93454efa45c8a258bfd013cc)
  ("50% chance to ..."). Example: `COINFLIP & Draw(CONTROLLER)`
* [`CLEAVE`](https://github.com/jleclanche/fireplace/commit/4ac052095d6366117f92d730dcf61d826049f6af)
  ("Also damages the minions next to whomever he attacks"). Usage: `Attack(SELF).on(CLEAVE)`
* [`EMPTY_HAND`](https://github.com/jleclanche/fireplace/commit/3a2db2d2ae162e78ef4124bedd2a092c10b856b3)
  ("If your hand is empty, ..."). Example: `EMPTY_HAND & Draw(CONTROLLER)`


[R.I.P. Grim Patron](https://github.com/jleclanche/fireplace/commit/0fa04a5f09f9fd9998e257e3f312d6986a7d1e47)


[99 files changed, 3601 insertions(+), 1976 deletions(-)](https://github.com/jleclanche/fireplace/compare/fe3edd0926f8d9245a190e5d113283e2270460ce...0fa04a5f09f9fd9998e257e3f312d6986a7d1e47)

Jerome
