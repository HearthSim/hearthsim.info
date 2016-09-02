---
layout: post
title: "Brawl Report: Captain Blackheart's Treasure"
permalink: /blog/brawl-report-captain-blackhearts-treasure/
gist: https://gist.github.com/jleclanche/110713c2eaf5fb9ea72a60c90211ae8f
---

The number of games being sent to [HSReplay.net](https://hsreplay.net) keeps increasing.
Following our [previous Brawl Report](/blog/brawl-report-a-dark-recipe/), we got a lot more data to play
with this time, so we wanted to go into a bit more depth than last time.

The rules of this brawl are simple:
 - Both players start with a deck of 30x 2/3 vanilla Pirates
 - Every turn, instead of drawing, players are presented with a "discover" pick, one of Minion/Minion/Spell.

Like before, here is the class matchup table for the brawl. This time, we got **over 9000** games!
We can immediately see that Warlock, without any good cards to draw from Life Tap, as well as Warrior,
stuck without any weapons due to the brawl rules, are both well below 50% winrate.

|    -    | DRUID | HUNTER | MAGE  | PALADIN | PRIEST | ROGUE | SHAMAN | WARLOCK | WARRIOR | TOTAL |
|:-------:|-------|--------|-------|---------|--------|-------|--------|---------|---------|-------|
| DRUID   | -     | 53,9%  | 48,4% | 42,8%   | 51,0%  | 52,2% | 48,1%  | 68,8%   | 57,5%   | 51,7% |
| HUNTER  | 46,1% | -      | 53,0% | 38,6%   | 50,0%  | 52,6% | 48,1%  | 61,1%   | 50,3%   | 49,5% |
| MAGE    | 51,6% | 47,0%  | -     | 47,5%   | 48,8%  | 58,6% | 47,9%  | 56,7%   | 56,5%   | 51,6% |
| PALADIN | 57,2% | 61,4%  | 52,5% | -       | 55,5%  | 56,6% | 47,6%  | 66,7%   | 51,1%   | 55,6% |
| PRIEST  | 49,0% | 50,0%  | 51,2% | 44,5%   | -      | 53,4% | 47,2%  | 53,2%   | 61,7%   | 51,0% |
| ROGUE   | 47,8% | 47,4%  | 41,4% | 43,4%   | 46,6%  | -     | 42,6%  | 53,3%   | 49,0%   | 45,7% |
| SHAMAN  | 51,9% | 51,9%  | 52,1% | 52,4%   | 52,8%  | 57,4% | -      | 64,3%   | 53,9%   | 54,0% |
| WARLOCK | 31,3% | 38,9%  | 43,3% | 33,3%   | 46,8%  | 46,7% | 35,7%  | -       | 50,4%   | 41,0% |
| WARRIOR | 42,5% | 49,7%  | 43,5% | 48,9%   | 38,3%  | 51,0% | 46,1%  | 49,6%   | -       | 45,8% |


With nearly ten thousand games available, we had nearly 100k "discover" picks to analyze.
We actually found that players preferred the left minion to the middle one. Spells would get picked
the most often, more than a third of the time:

| Left              | Middle   | Right |
|:------------------|:---------|:------|
|35%                |27%       |38%    |

<!--
We also looked at average pick costs with the available mana.
The following table only looks at the expected mana on the turn, not at the coin or similar effects:

| CardType,Mana | Average Picked Cost   |
|:--------------|----------------------:|
| MINION, 1     |                  4.13 |
| MINION, 2     |                  4.14 |
| MINION, 3     |                  4.27 |
| MINION, 4     |                  4.42 |
| MINION, 5     |                  4.64 |
| MINION, 6     |                  4.84 |
| MINION, 7     |                  4.92 |
| MINION, 8     |                  5    |
| MINION, 9     |                  5.1  |
| MINION, 10    |                  5.18 |
| SPELL, 1      |                  2.85 |
| SPELL, 2      |                  2.84 |
| SPELL, 3      |                  2.88 |
| SPELL, 4      |                  2.89 |
| SPELL, 5      |                  3.09 |
| SPELL, 6      |                  3.1  |
| SPELL, 7      |                  3.15 |
| SPELL, 8      |                  3.13 |
| SPELL, 9      |                  3.17 |
| SPELL, 10     |                  3.31 |
-->

Finally, we wanted to understand which cards were picked the most and the least.

Tirion Fordring was the all-time favourite of the brawl, picked **over 90% of the time**.
Coldlight Seer was the least picked card of the bunch, only picked 2% of the time.
That's three times less than Magma Rager!

The breakdown summaries, global and class-specific, can be found at the end of this post.
The full set of pick counts for each class is available [in this gist]({{ page.gist }}).

If you like these brawl reports, help us by [downloading Hearthstone Deck Tracker]({{ site.vars.hdt_download }})!
Your games will automatically be uploaded to [HSReplay.net](https://hsreplay.net) and will be used to create more
of these types of statistics reports.
The Brawl Reports are but the tip of the iceberg of cool things we're planning to do!


#### Most popular picks

| Card                  | Pick Rate   |
|:----------------------|:------------|
| Tirion Fordring       | 91%         |
| Dr. Boom              | 85%         |
| Call of the Wild      | 85%         |
| Confessor Paletress   | 79%         |
| Firelands Portal      | 76%         |
| Cabalist's Tome       | 74%         |
| Ragnaros the Firelord | 74%         |
| Earth Elemental       | 73%         |
| Savannah Highmane     | 73%         |
| Nexus-Champion Saraad | 73%         |


#### Least popular picks

| Card              | Pick Rate   |
|:------------------|:------------|
| Coldlight Seer    | 2%          |
| Junkbot           | 2%          |
| Murloc Tidecaller | 3%          |
| Grimscale Oracle  | 3%          |
| Mad Scientist     | 3%          |
| Ancient Watcher   | 3%          |
| Warsong Commander | 4%          |
| Hungry Crab       | 4%          |
| Wisp              | 4%          |
| Angry Chicken     | 5%          |


### Most / Least picked neutral cards

| Card                  | Pick Rate   |
|:----------------------|:------------|
| Dr. Boom              | 85%         |
| Ragnaros the Firelord | 74%         |
| Nexus-Champion Saraad | 73%         |
| Sylvanas Windrunner   | 71%         |
| Cairne Bloodhoof      | 66%         |


| Card              | Pick Rate   |
|:------------------|:------------|
| Coldlight Seer    | 2%          |
| Junkbot           | 2%          |
| Murloc Tidecaller | 3%          |
| Grimscale Oracle  | 3%          |
| Mad Scientist     | 3%          |


### Most / Least picked class cards

#### DRUID

| Card              | Pick Rate   |
|:------------------|:------------|
| Druid of the Claw | 68%         |
| Ancient of War    | 67%         |
| Swipe             | 66%         |
| Fandral Staghelm  | 65%         |
| Raven Idol        | 62%         |


| Card             | Pick Rate   |
|:-----------------|:------------|
| Savagery         | 8%          |
| Jungle Moonkin   | 10%         |
| Grove Tender     | 11%         |
| Wildwalker       | 17%         |
| Astral Communion | 17%         |


#### HUNTER

| Card              | Pick Rate   |
|:------------------|:------------|
| Call of the Wild  | 85%         |
| Savannah Highmane | 73%         |
| Animal Companion  | 71%         |
| Deadly Shot       | 64%         |
| Multi-Shot        | 60%         |


| Card              | Pick Rate   |
|:------------------|:------------|
| Starving Buzzard  | 6%          |
| Metaltooth Leaper | 8%          |
| Tracking          | 9%          |
| Call Pet          | 9%          |
| Timber Wolf       | 11%         |


#### MAGE

| Card              | Pick Rate   |
|:------------------|:------------|
| Firelands Portal  | 76%         |
| Cabalist's Tome   | 74%         |
| Unstable Portal   | 69%         |
| Fireball          | 63%         |
| Ethereal Conjurer | 62%         |


| Card              | Pick Rate   |
|:------------------|:------------|
| Shatter           | 9%          |
| Arcane Intellect  | 17%         |
| Wee Spellstopper  | 17%         |
| Ethereal Arcanist | 18%         |
| Goblin Blastmage  | 19%         |


#### PALADIN

| Card                | Pick Rate   |
|:--------------------|:------------|
| Tirion Fordring     | 91%         |
| Ragnaros, Lightlord | 73%         |
| Murloc Knight       | 71%         |
| Silvermoon Portal   | 62%         |
| Ivory Knight        | 61%         |


| Card               | Pick Rate   |
|:-------------------|:------------|
| Anyfin Can Happen  | 6%          |
| Divine Favor       | 10%         |
| Eye for an Eye     | 12%         |
| Vilefin Inquisitor | 13%         |
| Holy Wrath         | 13%         |


#### PRIEST

| Card                | Pick Rate   |
|:--------------------|:------------|
| Confessor Paletress | 79%         |
| Forbidden Shaping   | 72%         |
| Velen's Chosen      | 66%         |
| Cabal Shadow Priest | 62%         |
| Museum Curator      | 60%         |


| Card           | Pick Rate   |
|:---------------|:------------|
| Wyrmrest Agent | 6%          |
| Twilight Whelp | 6%          |
| Mindgames      | 8%          |
| Shadowbomber   | 11%         |
| Purify         | 11%         |


#### ROGUE

| Card                 | Pick Rate   |
|:---------------------|:------------|
| Shady Dealer         | 67%         |
| Xaril, Poisoned Mind | 67%         |
| Swashburglar         | 63%         |
| Dark Iron Skulker    | 63%         |
| Journey Below        | 62%         |


| Card            | Pick Rate   |
|:----------------|:------------|
| Iron Sensei     | 9%          |
| Sprint          | 9%          |
| Gang Up         | 10%         |
| Conceal         | 11%         |
| Sinister Strike | 12%         |


#### SHAMAN

| Card                   | Pick Rate   |
|:-----------------------|:------------|
| Earth Elemental        | 73%         |
| Flamewreathed Faceless | 71%         |
| Fire Elemental         | 69%         |
| Tuskarr Totemic        | 65%         |
| Al'Akir the Windlord   | 61%         |


| Card                 | Pick Rate   |
|:---------------------|:------------|
| Siltfin Spiritwalker | 7%          |
| Totemic Might        | 8%          |
| Far Sight            | 11%         |
| Ancestral Knowledge  | 12%         |
| Dust Devil           | 12%         |


#### WARLOCK

| Card          | Pick Rate   |
|:--------------|:------------|
| Imp-losion    | 68%         |
| Bane of Doom  | 68%         |
| Lord Jaraxxus | 67%         |
| Dark Peddler  | 63%         |
| Imp Gang Boss | 59%         |


| Card                | Pick Rate   |
|:--------------------|:------------|
| Reliquary Seeker    | 7%          |
| Sense Demons        | 8%          |
| Darkshire Librarian | 13%         |
| Tiny Knight of Evil | 13%         |
| Sacrificial Pact    | 14%         |


#### WARRIOR

| Card                | Pick Rate   |
|:--------------------|:------------|
| Malkorok            | 73%         |
| Grommash Hellscream | 72%         |
| Bloodhoof Brave     | 65%         |
| Obsidian Destroyer  | 61%         |
| Kor'kron Elite      | 61%         |


| Card                   | Pick Rate   |
|:-----------------------|:------------|
| Warsong Commander      | 4%          |
| Bolster                | 9%          |
| Screwjank Clunker      | 10%         |
| Warbot                 | 11%         |
| Alexstrasza's Champion | 12%         |


The HSReplay.net team
