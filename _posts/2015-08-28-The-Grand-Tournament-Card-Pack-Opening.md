---
layout: post
title: The Grand Tournament Card Pack Opening
permalink: /blog/the-grand-tournament-card-pack-opening/
---

The stats are in! A huge thank you to everybody who contributed. We have received data for **15,432 card packs** from nearly 300 submissions!

The largest card pack purchase was **1,290 packs**. It took 3 hours and 4 minutes to open that many packs.

In total, the disenchant value of all the card packs came out to **1,484,435 dust**.
That's enough dust to craft the full TGT set with all normal and golden cards nearly 5 times.

Across all those packs, every card was opened at least once, except for one:  a golden [Mistcaller](http://hearthstone.gamepedia.com/The_Mistcaller).


### The Best

The best pack by dust value was submitted by Rog. It contained:

 * Golden Acidmaw (Legendary)
 * Golden Dreadsteed (Epic)
 * Golden Dragonhawk Rider (Common)
 * Bear Trap (Common)
 * Tuskarr Totemic (Common)

That adds up to a value of **2,060 dust**. There were only three packs submitted with a value over 2,000 dust.

## Drop Rates

Here are the drop rates for each rarity of card from all the packs:

| Rarity    | Drop rate |
|:----------|----------:|
| Common    |  71.8393% |
| Rare      |  22.8684% |
| Epic      |   4.2782% |
| Legendary |   1.0140% |

Taking into account only the highest rarity card of each pack:

| Rarity    | Drop rate |
|:----------|----------:|
| Common    |   0.0000% |
| Rare      |  75.6569% |
| Epic      |  19.3130% |
| Legendary |   5.0301% |

Excluding the highest rarity card from every pack—that is, taking only the least rare four cards of each pack:

| Rarity    | Drop rate |
|:----------|----------:|
| Common    |  89.7991% |
| Rare      |   9.6714% |
| Epic      |   0.5196% |
| Legendary |   0.0099% |

Here, we sort all the packs by rarity and calculate the rate that each rarity of card is found in a particular position in the sorted pack. From top to bottom are the positions of the sorted card, sorted from least rare to most rare; from left to right are the rarities:

|    | Common   | Rare     | Epic     | Legendary |
|:---|---------:|---------:|---------:|----------:|
| 1x | 99.9801% |  0.0199% |  0.0000% |   0.0000% |
| 2x | 99.6426% |  0.3442% |  0.0132% |   0.0000% |
| 3x | 94.7316% |  5.1890% |  0.0794% |   0.0000% |
| 4x | 64.8421% | 33.1326% |  1.9856% |   0.0397% |
| 5x |  0.0000% | 75.6569% | 19.3130% |   5.0301% |

And here is the percentage for which any card of a particular rarity dropped from a pack:

| Rarity    | Drop rate |
|:----------|----------:|
| Common    |  99.9801% |
| Rare      |  95.8369% |
| Epic      |  20.3389% |
| Legendary |   5.0301% |

Taking this alone would mean that 7.57% of people who opened 50 packs got no legendaries from those packs. ([math](http://www.wolframalpha.com/input/?i=%281+-+5.0301%25%29^50+in+percent))
However, our data shows this is very unlikely to be the full story.  None of the 163 sessions with over 50 pack openings had zero legendaries in the first 50 packs.
The likelihood of *this* event, assuming a model that generates each pack independently, is less than one thousandth of a percent.
All of the sessions in our data set with no legendaries, of which there were 27, had at most only 30 pack openings.
Here are the stats for the number of legendaries in the first 50 packs of any session with at least 50 pack openings:

| Legendary pack count |  0 |  1 |  2 |  3 |  4 |  5 |
|:--------------------:|---:|---:|---:|---:|---:|---:|
| Number of sessions   |  0 | 37 | 63 | 31 | 26 |  6 |

Across 163 50-pack sessions, the absence of any zero-legendary session indicates that Hearthstone likely takes pity on someone who would otherwise roll 50 packs with no legendaries by giving them at least one legendary.

Finally, here is the distribution of golden cards overall and across all rarities:

| Rarity    | Drop rate |
|:----------|----------:|
| Common    |   2.0637% |
| Rare      |   5.5395% |
| Epic      |   4.5173% |
| Legendary |   7.3107% |
| Overall   |   3.0167% |


## Average Dust Value

We define the value of a card by its *dust value to disenchant*. That value doesn't change as you acquire more cards.
A pack's value can range from 40 dust (4 commons + 1 rare) to 8,000 dust (5 golden legendaries).
For scale, the entire TGT collection requires 311,920 dust to craft (or 64,720 if we exclude golden cards).

The average dust value of a single card over the dataset is **19.65 dust**.
A single pack is worth, on average, **98.25 dust**.

This is therefore the dust you can expect from your pack purchases, if you have a **complete collection, including all goldens**:

| Packs | Dust    |
|------:|--------:|
| 5     |  491.25 |
| 10    |  982.5  |
| 20    |  1965   |
| 40    |  3930   |
| 50    |  4912.5 |
| 60    |  5895   |


## A TGT Collection

But average dust value is a boring number, because it assumes you already have all the cards, including all goldens. And if you do, why are you buying packs?

A more interesting number is the expected *crafting* value, and this number changes as your collection grows.
These graphs explore the expected value of a pack as more and more packs are opened in a single collection.  First, let's clearly define a couple things:

* Crafting value:  The value of dust saved by not having to craft the cards the drop from a pack.  This decreases as your collection grows.
* Disenchant value:  Real dust from disenchanting duplicate cards in a pack.  This increases as your collection grows.

![Dust value per pack](/media/tgt-packs-dust-avg-graph.png)

We found that after opening 100 to 150 packs, the median crafting value of a pack plummets below its disenchant value; the majority of packs beyond the first hundred will be nearly worthless.
However, the average value of these later packs remains relatively high because of the extremely high crafting value of golden cards.

This scatter plot shows the possible value of each pack for 300 TGT packs starting from a collection with no TGT cards.
The golden points are packs whose crafting value is contributed *entirely* by gold cards, meaning there were no new non-gold cards in the pack.

![Dust value from goldens](/media/tgt-packs-scatter-crafting-values.png)

Finally, we simulated buying upwards of 25,000 packs and looking at the cumulative average of the packs' crafting and disenchant values.
We found that, *on average*, to have a complete TGT collection with all golden and normal cards takes roughly 1,700 packs.

![Cumulative dust value across 3000 packs](/media/tgt-packs-cumulative-craft-disenchant-values.png)


## Data and Source Code

A full, curated CSV export of the submitted data is available [here](https://gist.githubusercontent.com/jleclanche/9d3cfa115a2deec6b759/raw/2806438a31f85d4251eafa544e6544b762e35941/export.csv).
Each row represents one card and contains a file ID, pack ID it belongs to, a [Card ID](https://github.com/jleclanche/fireplace/wiki/Card-IDs),
a card set (should always be TGT), card class, rarity, premium type (golden) and a name the submission was credited to.

Source code is available on `gist:jleclanche/9d3cfa115a2deec6b759`, all in Python. It can be cloned with:

```sh
git clone git@gist.github.com:9d3cfa115a2deec6b759.git
```

There is a dependency on [Fireplace](https://github.com/jleclanche/fireplace), to turn Card IDs into cards. Python 3.4 is required.

The code contains a parser for the log files, very strict validation on the data (bad data is bad) and an exporter to CSV.

A pretty overview of some more stats (with tables!) is available on [Hearthpwn](http://www.hearthpwn.com/news/1020-power-core-card-back-at-blizzcon-eu-finals-tgt).
Note that the numbers there differ slightly, since some data here are more recent than that post's writing.
