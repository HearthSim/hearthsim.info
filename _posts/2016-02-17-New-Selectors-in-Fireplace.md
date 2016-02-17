---
layout: post
title: New Selectors in Fireplace
permalink: /blog/new-selectors-in-fireplace/
---

Over the last couple of weeks, at Jerome's suggestion, I rewrote all the
[selector code](https://github.com/jleclanche/fireplace/blob/d4252c9a4b5a3b4dbfa29c1a4556e1476968ce74/fireplace/dsl/selector.py).
The following summarizes what changed, and some of the motivation behind the rewrite and the new implementation.


## Overview

Selectors are part of the card definition DSL that pick out subsets of game entities.
As opposed to Actions, they do not mutate the game state at all.
The lack of state mutation makes selectors much easier to reason about,
and was a good reason to explicitly separate them out from the rest of the DSL.

For example, the card definition for
[Lightning Storm](https://github.com/jleclanche/fireplace/blob/a79c9a4bc5304d0c4c87d44f8d1a799dbe2c0e84/fireplace/cards/classic/shaman.py#L137) is simply:

```python
play = Hit(ENEMY_MINIONS, RandomNumber(2, 3))
```

Here, `ENEMY_MINIONS` is a selector that takes all the entities in the games and
picks out the enemy minions, which the `Hit()` action then takes as argument.
This way, if Lightning Storm ever changed for whatever reason (say, if it hit the
hero as well), then we could simply change `ENEMY_MINIONS` to `ENEMY_CHARACTERS`.

Selectors can be combined and composed with one another; for example, `ENEMY_MINIONS`
is equivalent to `IN_PLAY + ENEMY + MINION`, where `+` means set intersection of results.


### Existing selectors

The previous selector implementation had some interesting features:

* It defined a smaller DSL that looked a lot like
  [Forth](https://en.wikipedia.org/wiki/Forth_(programming_language)), with all variables and
  commands on an explicit [stack](https://en.wikipedia.org/wiki/Stack-oriented_programming_language)
* Each selector was itself defined in terms of this Forth-like sub-language
* Upon selector evaluation time, we iterate through the stack and execute any commands we find
* When we reach the end of the stack, we pop the last value on the stack and return it as the selector's result

If you've ever used an HP-12C calculator's
[reverse Polish Notation](https://en.wikipedia.org/wiki/Reverse_Polish_notation) syntax,
the selector implementation's sub-language should be immediately familiar.

The existing implementation was very flexible, but as we started profiling the performance of
Fireplace, a few issues became apparent:

* Selectors were around **35-40%** of total runtime for the existing implementation;
  almost every card in the game uses selectors, and they need to iterate through ~60-odd
  entities every time they're run
* Selectors were slow in part because deeply composed selectors
  (e.g. `FRIENDLY + IN_PLAY`) had long Forth-like programs, and there was significant
  overhead in building up the explicit stack and tearing it down again
* Reduced readability: To understand a selector's implementation, you need to understand
  both the DSL and the selector sub-language
  * Representing a selector like `DRAGON | (FRIENDLY + IN_PLAY)` essentially meant we took
    the card DSL's [AST](https://en.wikipedia.org/wiki/Abstract_syntax_tree), linearized it,
    then implicitly rebuilt the tree again when we evaluated the selector
  * The reader needs to mentally switch between infix and postfix notation on the fly


### New Selectors

The solution for the new implementation was to represent the DSL directly using Python
selector objects. To show what I mean, here's part of the implementatin for the root class:

```python
class Selector:
	...
	def eval(self, entities: List[BaseEntity], source: BaseEntity) -> List[BaseEntity]:
		return entities

	def __add__(self, other: SelectorLike) -> "Selector":
		return SetOpSelector(operator.and_, self, other)

	def __or__(self, other: SelectorLike) -> "Selector":
		return SetOpSelector(operator.or_, self, other)
    ...
```

Instead of defining an extra stack and another low-level DSL, the logic of selectors
is embedded directly in their implementations. For example, a `SetOpSelector`
simply takes two other selectors, evaluates them, and returns the merged result:

```python
def eval(self, entities, source):
	left_children = self.left.eval(entities, source)
	right_children = self.right.eval(entities, source)
	result_entity_ids = self.op(self._entity_id_set(left_children), self._entity_id_set(right_children))
	# Preserve input ordering and multiplicity
	return [e for e in entities if e.entity_id in result_entity_ids]
```

By doing things this way, we use the Python interpreter's program counter and stack
in place of the sub-language's PC and stack. This ends up being much faster,
because the interpreter's own PC and stack are in highly optimized C.
Profiling determined that new selectors only accounted for **15%** of runtime,
as opposed to **35-40%** before, so we more than doubled selector performance.
Some of the gains are from using the interpreter's stack, and some of them are
in removing some redundant entity checks directly.

Readability is also enhanced a bit, as the new selector logic is written in
straightforward Python. The mapping from DSL to selectors is straightforward;
for example, `SELECTOR1 + SELECTOR 2 | SELECTOR3` is a tree with 3 leaf
nodes and two `SetOpSelector` nodes. All in all, the new implementation
is about 100 lines of code shorter.


### PEP 0484 or: how I Learned to Stop Worrying and Love Gradual Typing

This change also marks the debut of [PEP 0484](https://www.python.org/dev/peps/pep-0484/)
type hints into the codebase. These were introduced in Python 3.5, and I'm personally
a huge fan type hinting and static type checking in general. While still in the early
stages, they have a lot of potential to aid readability, help catch bugs, and most
importantly in Python, *are completely optional and work hand in hand with duck typing*.
The last point is especially important, as Fireplace currently uses dynamic dispatch
and duck typing widely.

For anyone interested in type theory or where Python is going or just writing cleaner
code, I highly recommend seeing Guido's PyCon talk on the topic here:

[![Type Hints - Guido van Rossum](https://img.youtube.com/vi/2wDvzy6Hgxg/0.jpg)](https://www.youtube.com/watch?v=2wDvzy6Hgxg)

[26 files changed, 1013 additions(+), 635 deletions(-)](https://github.com/jleclanche/fireplace/compare/f9dbd4bb8f07e6269c71243a631427d89028420d...5316f18cc5e7dbaf003f7fccd3cc52f9c7b9e5d4)

JimboHS
