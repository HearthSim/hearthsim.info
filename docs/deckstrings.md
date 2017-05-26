---
layout: page
title: Blizzard Deckstrings
permalink: /docs/deckstrings/
---

The Blizzard Deckstring format is a base64-encoded compact byte string, which
losslessly encodes an arbitrary Hearthstone deck.

The purpose of the format is to allow players to share Hearthstone decks, import
them into or export them from Hearthstone.


## DBF IDs

The format uses DBF IDs to represent cards. DBF IDs are found in the game files.
A reference API is available on [HearthstoneJSON](https://hearthstonejson.com).


## Format

The deckstring is a base64-encoded byte string. We decode it first.

**Unless specified otherwise, every value that follows is an integer, encoded as
a [varint](https://en.wikipedia.org/wiki/Variable-length_quantity).**


### 1. Header block

1. Reserved byte `0x00`
2. Version (`1`)
3. Format

The deckstring begins with the byte `0x00`. It is then followed by the encoding
version number. The version is currently always `1`.

The Format value is a varint representing Standard or Wild. Its actual value is a
[FormatType enum](https://github.com/HearthSim/python-hearthstone/blob/master/hearthstone/enums.py).

### 2. Cards block

The cards block is split in four pairs of length + array in the following order:

1. Heroes
2. Single-copy cards
3. 2-copy cards
4. n-copy cards

**Each pair has a leading varint specifying the number of items in the array.**
For the first three blocks, those are arrays of varints. For the last block, it
is an array of pairs of varints. The goal of this structure is to make the
deckstring as compact as possible.
**Each card is represented with a varint DBF ID as mentioned before.**

Heroes: An array of heroes present in the deck. In other words, which hero the
deck was made for. You should really always expect one.
Additional note: The hero's class determines which class the deck is for, but the
deck is ostensibly made for a hero, not a class. If the specified hero is a hero
skin, it will be used instead of the main hero iff available.

Single-copy cards: Cards for which there is exactly one copy in the deck.
2-copy cards: Cards for which there is exactly two copies in the deck.

n-copy cards: All other cards in the deck. This array is a list of varint pairs,
representing first the dbf id, followed by the amount of times that card is
present in the deck. This SHOULD only contain cards with a minimum of 3 instances
in the deck, which means that it will (at this time) always be empty for
constructed decks; however it can theoretically contain single and double copy
cards as well.

Although final ordering does not matter, cards are sorted by DBF ID in their
respective array in order to consistently generate the same deckstrings for the
same decks.

## Comments

When pasted into Hearthstone, the client will disregard any line beginning with
the `#` character, which allows inserting comments into the string.
One exception is the first line beginning with `###` preceding the deck string,
which will be used as the deck name if available.


## Examples


## References

### Python

The [python-hearthstone](https://github.com/hearthsim/python-hearthstone) library
for Python 3 contains a `hearthstone.deckstrings` module which allows encoding
and decoding of deckstrings.

```py
from hearthstone.deckstrings import Deck
from hearthstone.enums import FormatType

# Create a deck from a deckstring
deck = Deck()
deck.heroes = [7]  # Garrosh Hellscream
deck.format = FormatType.FT_WILD
# Nonsense cards, but the deckstring doesn't validate.
deck.cards = [(1, 3), (2, 3), (3, 3), (4, 3)]  # id, count pairs
print(deck.as_deckstring)  # "AAEBAQcAAAQBAwIDAwMEAw=="

# Import a deck from a deckstring
deck = Deck.from_deckstring("AAEBAQcAAAQBAwIDAwMEAw==")
assert deck.heroes == [7]
assert deck.format == FormatType.FT_WILD
assert deck.cards == [(1, 3), (2, 3), (3, 3), (4, 3)]
```

### Javascript

The [deckstrings](https://github.com/hearthsim/npm-deckstrings) library on npm
can be used to encode and decode deckstrings.

```javascript
import {encode, decode} from "deckstrings";

const deck = {
	cards: [[1, 3], [2, 3], [3, 3], [4, 3]], // [dbfid, count] pairs
	heroes: [7], // Garrosh Hellscream
	format: 1, // 1 for Wild, 2 for Standard
};

const deckstring = encode(deck);
console.log(deckstring); // AAEBAQcAAAQBAwIDAwMEAw==

const decoded = decode(deckstring);
console.log(JSON.stringify(deck) === JSON.stringify(decoded)); // true
```
