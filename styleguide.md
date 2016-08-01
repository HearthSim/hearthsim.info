---
layout: page
title: The HearthSim Styleguide
permalink: /styleguide/
---

This is the HearthSim Styleguide for code and commits.

Consistency in style increases readability. This lowers the barrier of entry
for new contributors and reduces the chances of trivial mistakes, typos and
bugs surfacing.

HearthSim projects adhere to the style guidelines highlighted here.


## All languages

### The golden rules

**All projects use tabs**. [Here](https://leclan.ch/tabs) is the reasoning
behind this decision. In not so many words, tab size can be customized by the
reader which means indent size preferences do not matter.

**Readability matters**. If a rule is causing code to become less readable,
knowing when to bend it is more important than obeying some guidelines.

All rules are there to make your code more readable. If they are not achieving
that, it's a bug.

### The specifics

**Clear, concise variable names**. Also see:
[How to name things in programming](http://www.slideshare.net/pirhilton/how-to-name-things-the-hardest-problem-in-programming).
Use the established language convention for the casing style (for example,
`under_score` for Python variables, `camelCase` for JavaScript variables).

**Avoid alignment in general** unless you have a good reason not to.
Mid-line alignment means having to go back on previous untouched line and
add unnecessary noise/whitespace changes in your commits when changing other
lines in the block. This makes reviews harder and can let bugs sneak in.

**Avoid left-alignment specifically**. Left-alignment is not just ugly, it is
incompatible with both tabs and proportional fonts (mixed indent is never
acceptable). Fortunately, there are better alternatives:

```py
# Bad
def some_function(lots, of, arguments, ...
                  even, more args):
    pass

# Good
def some_function(
	lots, of, arguments, ...
	even, more, args
):
	pass

# Better
def some_function(less, arguments):
	pass
```

**Wrap for clarity**. Line length softwrap limits are a popular debate but
rarely actually matter. 80 characters, 90, 100, 120... it tends to all be the
same. Long lines are generally less readable than shorter ones, so you should
strive to have them below 80 characters, but it should not be a big deal if you
go past that limit.
The established limit in our projects is 92 characters for code. **Never break
lines for the sake of the wrap limit**. A series of backslashes make code very
hard to folow. If you have to deal with a long line, make sure to move logic to
temporary variables with concise names... as long as it makes sense to do so.
Text matters less, as long as it's consistent - inconsistent wrapping in text
makes it a lot less readable.
The exception to this is git commits. Those are limited to 72 characters for
the summary, 79 for the description.


## Git

The Git tree is one of the core parts of the project. It is one of the first
places new contributors will look at the project. **Keep it healthy**.

Basic rules:

**One change per commit**. There should be no changes in a commit which are
unrelated to its message. This makes the log easier to follow and helps with
[bisection](https://git-scm.com/book/en/v2/Git-Tools-Debugging-with-Git).

**Each individual commit should pass tests**. This is more of a guideline than
a rule, but the spirit of it is to have individual commits that make sense on
their own and can be reverted.

**Consistent commit messages** with a one-line summary and a description if
needed. Follow [these conventions](http://chris.beams.io/posts/git-commit/).

**Use autoclose messages**. If a commit fixes a bug, append `Fixes #xxx` at
the end of the description (where `xxx` is the issue number). Github supports
this syntax to autoclose the issue in question.
If the issue is not specifically a bug, or isn't simply fixed, use `Closes`
instead of `Fixes`.

**No merge commits**. Merge commits have their use; unfortunately, in both git
and Github, they are unnecessary noise in the logs. As we have established, the
git log is a precious resource for both newcomers and veterans to a project and
should be treated with respect. Merge commits ruin that.

**Project-specific destructive operation windows**. Rebases, amends and fixes
of the sort are very useful to keep a clean tree but they are destructive
operations and are a problem for other contributors. A very large project may
simply not have a destructive window at all, while an unknown one has as long
as the author wants. A good default on the more popular projects is 5 minutes,
which leaves enough time to fix any immediate problems.

**Reminder to contributors**:

When filing a Pull Request, make sure it is rebased on top of most recent master.
If you need to modify it or amend it in some way, you should always appropriately
[fixup](https://help.github.com/articles/about-git-rebase/) the issues in git and
force-push your changes to your fork.

Also see:

* [Using Pull Requests](https://help.github.com/articles/using-pull-requests/)


## Python

Our Python code follows [PEP8](https://www.python.org/dev/peps/pep-0008/), with
exceptions outlined in the general section and below.

**Double quote priority**. That means you should use `"double quotes"` instead
of `'single quotes'` for strings, unless there are `'double quotes "inside"'`
the declared string. If there are both types, use double quotes.
For docstrings, *always* use triple-double quotes.

**No import block separation**. The ordering stays the same as in PEP8, but we
do not separate each block by newlines as this far too often results in noise.


## Go

Use [`gofmt`](https://golang.org/cmd/gofmt/). It's that simple.


## CSS

* Use K&R brace format.
* Always use trailing semicolons.
* Don't break between selectors, unless there are a lot of them.

```css
/* Good */
.warning, .error {
	color: red;
}

/* Bad */
.warning,
.error
{
	color: red;
}
```
