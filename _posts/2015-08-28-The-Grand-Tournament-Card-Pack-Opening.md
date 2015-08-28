---
layout: post
title: The Grand Tournament Card Pack Opening
permalink: /blog/the-grand-tournament-card-pack-opening/
published: false
---

The stats are in! A huge thank you to everybody who contributed. We have received almost 300 submissions with a total of **15432 card packs**!

The largest card pack purchase was of **1290 packs**. It took 3 hours and 4 minutes to open that many packs.

In total, the card packs accounted for **_ dust**.

Nobody got a golden [Mistcaller](http://hearthstone.gamepedia.com/The_Mistcaller).


### Best pack

The best pack was obtained by Rog, who purchased 89 card packs.
It contained:
 * Golden Acidmaw (Legendary)
 * Golden Dreadsteed (Epic)
 * Golden Dragonhawk Rider (Common)
 * Bear Trap (Common)
 * Tuskarr Totemic (Common)

Total worth: **2060 dust**. There were only three packs submitted with a worth of over 2000 dust.


### Rarity distribution

One of the goals of this study was to try to determine the algorithm used to generate a pack.
We ran simulations under multiple possible models and tried to reproduce the numbers we got in the submitted set.

When looking at individual distribution and keeping in mind that every pack contains at least a rare card,
this was the distribution for all the submitted cards:

 * 71.856% Common
 * 22.861% Rare
 * 4.264% Epic
 * 1.01% Legendary

When we excluded the *highest* rarity card from every pack (4-card packs), the distribution looked like this:

 * 89.820% Common
 * 9.645% Rare
 * 0.522% Epic
 * 0.01% Legendary

These determined the second-highest rarity in a card pack. Due to the small sample size, Epic and Legendary rarities are somewhat unreliable there.

The distribution for the highest rarity card in every pack exclusively is:

 * 0% Common
 * 75.724% Rare
 * 19.234% Epic
 * 5.04% Legendary


### Average dust values

We define the worth of a card by its *dust value to disenchant*. That value doesn't change as you acquire more cards.
A pack's value can range from 40 dust (4 commons + 1 rare) to 8000 dust (5 golden legendaries).

The average dust value of a single card over the dataset is **19.66 dust**.
That makes a single pack purchase worth, on average, **98.3 dust**.

This is therefore the dust you can expect from your pack purchases, if you have a **complete collection, including all goldens**:

* 5 packs: 491.5 dust
* 10 packs: 983 dust
* 20 packs: 1966 dust
* 40 packs: 3932 dust
* 50 packs: 4915 dust
* 60 packs: 5898 dust


### Pack simulations

Now, this previous number is a bit boring, because it assumes you already have all the cards, including all goldens. And if you do, why are you buying packs?

It's more interesting to see what the expected *crafting* value is, and plot it against your collection as it grows.
In the following graph, we explore the average expected value of a pack, from an empty TGT collection to a full one:

* Expected crafting value: How much dust crafting value you save by purchasing a pack (down towards 0 for a full collection)
* Expected dust: How much actual dust you will get on average by purchasing a patch (up from 0 for an empty collection)


<img src="https://raw.githubusercontent.com/HearthSim/hearthsim.github.io/master/media/tgt-packs-dust-avg-graph.png"/>

We found that after acquiring 100-150 packs, the crafting value of a pack plummets below its disenchant value and the majority of packs
past that will in fact be worthless. However, the average value remains very high due to the extremely high crafting value of golden cards.

The following scatter graph was created from simulating purchases of 1000 packs.
The golden points are packs whose value is contributed *entirely* by gold cards (eg. no non-golden value).

<img src="https://raw.githubusercontent.com/HearthSim/hearthsim.github.io/master/media/tgt-packs-scatter-crafting-values.png"/>

Finally, we simulated buying upwards of 25000 packs and looking at the cumulative crafting and disenchant values.

We found that to acquire a complete TGT collection (all gold cards included), you would have to purchase roughly 1250 packs.

<img src="https://raw.githubusercontent.com/HearthSim/hearthsim.github.io/master/media/tgt-packs-cumulative-craft-disenchant-values.png"/>


### Source code and raw data

A full, curated CSV export of the submitted data is available [here](https://gist.githubusercontent.com/jleclanche/9d3cfa115a2deec6b759/raw/064e4aede08bd4999ff961ad158fd7fae09a82eb/export.csv).
Each row represents one card and contains a file ID, pack ID it belongs to, a [Card ID](https://github.com/jleclanche/fireplace/wiki/Card-IDs),
a card set (should always be TGT), card class, rarity, premium type (golden) and a name the submission was credited to.

Source code is available on `gist:jleclanche/9d3cfa115a2deec6b759`, all in Python. It can be cloned with:

```sh
git clone git@gist.github.com:9d3cfa115a2deec6b759.git
```

There is a dependency on [Fireplace](https://github.com/jleclanche/fireplace), to turn Card IDs into cards. Python 3.4 is required.

The code contains a parser for the log files, very strict validation on the data (to catch potential fakes) and an exporter to CSV.

A pretty overview of some more stats (with tables!) is available on [Hearthpwn](http://www.hearthpwn.com/news/1020-power-core-card-back-at-blizzcon-eu-finals-tgt).
Note that some numbers might differ very slightly because of a few more submissions that made the cut after it was posted.
