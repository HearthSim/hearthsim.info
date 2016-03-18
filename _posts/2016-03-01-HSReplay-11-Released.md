---
layout: post
title: HSReplay 1.1 Released
permalink: /blog/hsreplay-11-released/
---

HSReplay 1.1 has been released.
This update fixes misuses of some attributes, adds some game/player metatada
and removes the playerID concept from HSReplay itself, forcing usage of entity
IDs instead.

Because HSReplay 1.0 is not used in any live application today, it has been
deprecated and support for it has been removed from all clients. The minimum
supported version is HSReplay 1.1.


### Decklist support

Support for initial decklists has been added. The Player entity may now have
a <Deck> element which contains a list of <Card> objects with the id, count
and premium attributes. This is an unordered list that contains the cards
which the game was *initialized with*. It does *not* contain the deck as
first created, nor is it ordered by draw card.
It must not be included unless it is fully known.

### General

 - Game gained the optional id attribute
 - Player gained the optional rank, legendRank and cardback attributes
 - All ts attributes now MUST be ISO8601 compliant (time or datetime)

### Actions

 - Action.index default value is now "-1"
 - Action.target default value is now "0"
 - MetaData.data default value is now "0" and has been renamed to entity
 - Info.id has been renamed to entity
 - Info.index is now optional and recommended to be left out
 - Allow ChosenEntities tag inside Action tags

### Choices

 - Choice.min and Choice.max are now both required
 - Choice.playerID has been removed
 - Added Choice.id, which contains the choice's id
 - The purpose of Choice.entity has been clarified
 - Choice.index is now optional and recommended to be left out
 - SendChoices.entity has been renamed to id
 - ChosenEntities.playerID has been removed
 - Added ChosenEntities.id, which contains the choice's id

The DTD for HSReplay 1.1 format is available here:

<http://hearthsim.info/hsreplay/dtd/hsreplay-1.1.dtd>

Jerome
