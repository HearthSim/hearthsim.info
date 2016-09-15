---
layout: post
title: "Brawl Report: Cart Crash at the Crossroads"
permalink: /blog/brawl-report-cart-crash-at-the-crossroads/
---

Another week, another very interesting Tavern Brawl to analyze. Far more popular than the
[Captain Blackheart brawl](https://hearthsim.info/blog/brawl-report-captain-blackhearts-treasure/),
users on [HSReplay.net](https://hsreplay.net) played over 16000 games over the course of the brawl.

The rules:

- Each player starts with a randomly-generated deck of 15 cards for their class
- Before their first draw, players get to "discover" one of three other classes and shuffle 15 more
cards of that class to their deck.

The "second class" twist adds another interesting dimension to winrates as we now look at class
pairs, although with the possible combinations of 9 starting heroes and 8 possible second picks
for each player, that makes for 5184 possible different starting games! We would have needed at
least 50000-100000 games to draw solid conclusions from those.

It is also worth noting that the opponent's "discarded" second class choices were not available for
the player to see, so we could only gauge popularity from the friendly player.


## Class winrates and popularity

Paladin had by far the best cards for this brawl, with a 55% overall base winrate and 52% overall
second-pick winrate.

| First Hero   | Winrate | Popularity |
|:-------------|:--------|:-----------|
| PALADIN      | 55%     | 12%        |
| MAGE         | 54%     | 17%        |
| DRUID        | 53%     | 11%        |
| HUNTER       | 49%     | 11%        |
| ROGUE        | 49%     | 10%        |
| SHAMAN       | 49%     | 8%         |
| WARLOCK      | 46%     | 11%        |
| WARRIOR      | 46%     | 10%        |
| PRIEST       | 45%     | 10%        |

| Picked Class   | Winrate | Popularity |
|:---------------|:--------|:-----------|
| PALADIN        | 52%     | 15%        |
| DRUID          | 51%     | 13%        |
| WARRIOR        | 51%     | 9%         |
| HUNTER         | 50%     | 12%        |
| MAGE           | 50%     | 19%        |
| PRIEST         | 49%     | 10%        |
| SHAMAN         | 49%     | 9%         |
| ROGUE          | 48%     | 9%         |
| WARLOCK        | 47%     | 6%         |


## Class pair winrates and popularity

As we saw above, Paladin and Mage are the uncontested winners of this brawl.

#### Best pairs

| 1st / 2nd Hero    | Winrate | Popularity |
|:------------------|:--------|:-----------|
| PALADIN / WARRIOR | 59.6%   | 1.3%       |
| MAGE / PALADIN    | 57.8%   | 3.2%       |
| PALADIN / MAGE    | 57.4%   | 2.9%       |
| MAGE / HUNTER     | 56.6%   | 2.6%       |
| ROGUE / PALADIN   | 56.3%   | 1.5%       |

#### Worst pairs

| 1st / 2nd Hero     | Winrate | Popularity |
|:-------------------|:--------|:-----------|
| WARRIOR / WARLOCK  | 42.1%   | 0.5%       |
| WARRIOR / HUNTER   | 42.0%   | 1.1%       |
| PRIEST / DRUID     | 41.9%   | 1.3%       |
| PRIEST / WARLOCK   | 39.2%   | 0.8%       |
| HUNTER / PRIEST    | 39.0%   | 0.7%       |


#### Most popular pairs

| 1st / 2nd Hero      | Winrate | Popularity |
|:--------------------|:--------|:-----------|
| MAGE / PALADIN      | 57.8%   | 3.2%       |
| PALADIN / MAGE      | 57.4%   | 2.9%       |
| MAGE / HUNTER       | 56.6%   | 2.6%       |
| MAGE / DRUID        | 55.4%   | 2.6%       |
| DRUID / MAGE        | 52.4%   | 2.4%       |


#### Least popular pairs

| 1st / 2nd Hero         | Winrate | Popularity |
|:-----------------------|:--------|:-----------|
| HUNTER / PRIEST        | 39.0%   | 0.7%       |
| DRUID / WARLOCK        | 49.7%   | 0.6%       |
| ROGUE / WARLOCK        | 43.6%   | 0.5%       |
| WARRIOR / WARLOCK      | 42.1%   | 0.5%       |
| SHAMAN / WARLOCK       | 50.3%   | 0.5%       |


We are already working on the next brawl: **Top 3**.

If you like these articles and want to contribute,
simply [download the latest HDT beta]({{ site.vars.hdt_download }}) and contribute your games to the
[HSReplay.net](https://hsreplay.net) database!


The HSReplay.net team
