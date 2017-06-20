---
layout: page
title: Hearthstone Card Data
permalink: /docs/cards/
---

Almost everything in Hearthstone is a card; more than you'd normally expect.
There's the card types you can play (Minion, Spell and Weapon), but you will
also find in the game files cards for heroes, hero powers and enchantmentts.


## Card IDs

Cards have two primary types of IDs: Numeric and String.

String "CardIDs" (sometimes referred to as "mini guids") are a short-form
unique identifier that usually looks like `ABC_123`, where ABC is a card set
and 123 is a number within that card set. For example, `EX1_001` is Lightwarden,
`EX1_116` is Leeroy Jenkins, `HERO_01` is Garrosh Hellscream, and `UNG_034` is
Radiant Elemental.

Numeric "DBF IDs" are integers that uniquely identify those same cards within
the DBF files. Lightwarden is `1655`, Leeroy Jenkins is `559`, Garrosh
Hellscream is `7` and Radiant Elemental is `41176`.

CardIDs are inconsistent and case-sensitive. Some other examples of CardIDs are
`TB_RandHero2_001`, `XXX_001`, `skele11`, `tt_004`, `LOEA02_01h`, `DS1h_292_H1`
and `TB_PickYourFate_7_EnchMiniom2nd`.


## Reference databases

### HSData.git

The [hsdata repository](https://github.com/HearthSim/hsdata) on GitHub is an
auto-generated git repository of the game data files for each Hearthstone build
publicly available.

Its contents are:

* `Strings/`: Localized string data for the game (globalstrings).
* `CardDefs.xml`: A custom XML file with a consistent format across all builds.

CardDefs.xml contains all card data in one easily parsed and human-readable XML
file. Both CardIDs and DBF IDs are available for all cards.


### HearthstoneJSON

The CardDefs.xml file is used to generate [HearthstoneJSON](https://hearthstonejson.com/).
Since web developers most likely do not want to deal with XML files, the
HearthstoneJSON files make that same card data available in JSON format.
