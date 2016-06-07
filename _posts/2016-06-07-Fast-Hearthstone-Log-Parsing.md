---
layout: post
title: Fast Hearthstone Log Parsing
permalink: /blog/fast-hearthstone-log-parsing/
---

A few months ago, Blizzard added a "PowerTaskList" log to the Power.log file.
It's an interesting addition: Rather than log the game state updates, it logs
the animation queue - in other words, in PowerTaskList, each game state delta
block is logged as it happens on screen in the Hearthstone client.

In practice, this means every single line in Power.log is now duplicated. It
makes the file very hard to follow... and that was very annoying.

This is how HSReplay was born. Of course, initially I wanted to get crazy and
have a "human-readable" mode as well as the current "compact" mode. Cutting
that was a good decision.

I wrote an initial version of a regex-based log parser. It would read every
line and build an HSReplay (then called "Powerlog") file as the log was being
read.
The parsing was solid but the implementation was ugly. The various changes to
the Power.log format every build quickly made it unmaintainable.

Inspired by the Javascript library
[Hearthstone-Log-Watcher](https://libraries.io/npm/hearthstone-log-watcher),
I started working on a rewrite of the parser which would support events as
they happened when they were being read. The new parser would have to support
streaming files. This also meant that building the XML tree would be ripped
out of the parser and into its own library.

A fairly small amount of code actually changed. XML elements were now packets
and instead of an XML tree, we now had a packet tree. This separation of
concerns turned out to be an excellent design decision as we are now able to
operate on game state and game state changes in-memory with a single log read.

This new parser is available in the `hearthstone` library, as
[`hearthstone.hslog`](https://github.com/HearthSim/python-hearthstone/tree/master/hearthstone/hslog).

Coming up to the public release of the HSReplay website, this log parser got a
lot of love. It is, by a wide margin, one of my favourite pieces of code.
One major issue with it was actually performance. A consequential log file,
with 15-20 games, could take up to 30 seconds to convert to XML on a beefy CPU.
Without looking into it, my instinct initially told me to swap out ElementTree
for lxml. So I added support for lxml and conversion was a little faster, but
it turned out most of the time was spent in parsing.

As it turns out, timestamp parsing is *extremely slow*. For every line, the
parser would read its timestamp first and convert it to a datetime object,
using `dateutil.parser.parse`.

You might be confused as to why we perform timestamp parsing at all. Well, the
`<logger>.log` files Unity spits out actually don't have a date at all, only a
time. This is enraging - a source of much trouble. To remedy this, we accept an
"initial datetime" which we correlate with the first timestamp in order to add
the date to all the further timestamps.
In order for this to work across days (past midnight), we have to do some form
of continuous parsing otherwise the logs will jump back a day in time.

Doing this for every line is unnecessary, though. Cutting parsing down to only
lines we actually used reduced parsing time by over **70%**! And it is possible
to reduce it further by doing selective timestamp parsing (which is possible by
subclassing `LogParser` and overriding the `parse_timestamp` method).

So we now have an extremely efficient log parser which lets us operate on the
game state in one read, supports streaming log files and has an event subsystem
which lets us do continuous statistical analysis as the log is being read.

**AWESOME**.

Now, the packet tree isn't even the whole picture. As the tree is being built,
HSLog also tracks the current game state. For that, it creates Entity objects
and a full game state structure.
I have a JSON format in mind for the game state which I would like to soon add
an export for in HSLog. Other libraries and applications will then be able to
also import/export game states. This is super useful if you want to implement
interoperation between clients such as Joust, Fireplace and HSLog.

HSLog is a core part of the HSReplay website. Please use it! Give feedback in
the `#hearthsim` channel on Freenode or directly on the Github issue tracker.

Jerome
