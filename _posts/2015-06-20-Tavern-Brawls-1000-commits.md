---
layout: post
title: Tavern Brawls, 1000 commits.
---

I just pushed the 1000th commit in [Fireplace](https://github.com/jleclanche/fireplace).

I started the project almost a year ago.
The [initial commit](https://github.com/jleclanche/fireplace/commit/c144d1b37e2872383217946c94d713cec358cfec)
had support for creating `Game`, `Player` and `Deck` objects and would get you as far as `Game.start()`.
It was a glorified card shuffler and was based on the data from [HearthstoneJSON.com](http://hearthstonejson.com/). 

It has been almost a year since I started the project. Fireplace now supports most cards and mechanics in the game,
although some of the more elaborate bits are still missing.

The Hearthsim community is flourishing. Patashu, one of our members, has been publishing
["Hearthstone Science" videos](https://www.youtube.com/user/Patashu/videos) which have grown quite popular.
The [4/11 Twilight Drake setup](https://www.youtube.com/watch?v=ZKf8WId7N0Q) is my personal favourite, due to how
elaborate it is, and after coming up with it late at night, unable to sleep.

I'm also very happy to see that Team 5 continues to be so open and forward with its community. Hearthstone still
feels like an indie game in many ways. I hope this continues, because I have recently started work on
[Stove](https://github.com/hearthsim/stove), a Pegasus-compatible server in Go that will run Fireplace as its
simulation server. Early days and little time to work on it though, full-blown Fireplace games on the official 
client are still a long way off. 

Very recently, Blizzard released [Tavern Brawl](http://hearthstone.gamepedia.com/Tavern_Brawl), a new
Player vs. Player game mode featuring unique cards and decks. Some of the mechanics and interactions featured
in Tavern Brawl are unique, making it a fantastic testbed for Fireplace.

I have gleaned as much as I could from it, and even started implementing it. While working on
[Wild Magic](http://hearthstone.gamepedia.com/Wild_Magic_\(Tavern_Brawl\)), I got distracted by an outstanding
cleanup in card actions. Getting a random card from within an action was fairly nasty before.

Take [Webspinner](http://hearthstone.gamepedia.com/Webspinner) for example:

```python
class FP1_011:
	def deathrattle(self):
		choice = randomCollectible(type=CardType.MINION, race=Race.BEAST)
		return [Give(CONTROLLER, choice)]
```

The card couldn't be fully declarative, as the `randomCollectible` helper was evaluated during the action itself.
This is no longer the case. [48f46fd](https://github.com/jleclanche/fireplace/commit/48f46fd2d68064504afbcc53138344c33c7eb427)
implements a RandomCardGenerator which is used by the `Give` and `Summon` actions to find random cards by various
criteria. Like before, those criteria can be any CardXML attribute - so if you wanted to find a random legendary
minion, you would now do: `RandomCardGenerator(type=CardType.MINION, rarity=Rarity.LEGENDARY, collectible=True)`.

To make it easier, we also have `RandomCard`, `RandomCollectible`, `RandomMinion` etc. This is the new Webspinner:

```python
class FP1_011:
	def deathrattle(self):
		deathrattle = [Give(CONTROLLER, RandomMinion(race=Race.BEAST))]
```

How concise.

Incidentally, I adopted the same system for [Spare Parts](http://hearthstone.gamepedia.com/Spare_Part).
From the information in the game files, it looks like Blizzard uses the Entourage mechanism to conjure Spare Parts
from various cards. Unnecessary duplication of effort.

I used to have a `GiveSparePart` action to work around the non-declarative nastiness mentioned above. This is now
gone as well, as it's now possible to do `Give(CONTROLLER, RandomSparePart())`.

I hope to finish Tavern Brawls soon. There's still quite a bit to test and, unfortunately, there is no way to
continue testing specific scenarios after they have closed. I don't know what's in store for the next weeks, but
I'm looking forward to it.

[72 files changed, 10637 insertions(+), 131 deletions(-)](https://github.com/jleclanche/fireplace/compare/c144d1b37e2872383217946c94d713cec358cfec...2888f452c4c2299eebc5233b9775e0e8034b6775)

Jerome
