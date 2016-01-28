---
layout: post
title: The Problem with Nozdormu
permalink: /blog/the-problem-with-nozdormu/
---

Nozdormu is one of the most unique cards in Hearthstone. Along with the
[AFK hidden buff](http://hearthstone.gamepedia.com/AFK#System_effects), it is the only
card to modify the turn timer directly.

In the Hearthstone client itself, there is one very serious issue with turn timers
however: The opponent's turn begins the *moment* the "End Turn" button is clicked,
regardless of whether animations are still running.

The exploit comes from how easy it is to "steal" the opponent's turn, by filling their
entire turn with long animations. With end-of-turn and beginning-of-turn effects eating
away at that time as well, and the huge advantage an unchallenged Nozdormu brings to
the field, skipping a single turn is usually enough to turn a game and steal it. This
results in one of the most frustrating and objectively unfair experiences in Hearthstone.

This is not easy to fix at all. Hearthstone's match simulation is done entirely server-side,
its results are immediately transmitted to the clients - not synchronized with animations.

If you are interested in reading more about the internals of the Hearthstone protocol,
[here](https://github.com/jleclanche/fireplace/wiki/Understanding-the-Hearthstone-Protocol)
is an article detailing it.

[![Nozdormu](/images/nozdormu.png)](http://hearthstone.gamepedia.com/Nozdormu)

## Three solutions

Hearthstone has a "turn timer slush", which is some amount of seconds added to the turn
timer based on the amount of actions taken by the other player during their turn. This
was added specifically to solve the "animations eating into turn time" issue, but is very
primitive - the animation time itself is not simulated, just a static amount.

The "intuitive" solution is therefore to fix that, but that would essentially require
running a server-side animation simulator, which is all sorts of nasty (and really hard).

So "just fix the slush" is out. Here are three actual potential solutions:


### Nozdormu speeds up animations

Speeding up animations while Nozdormu is on the board is, I think, the most interesting
solution of the lot because it would *add* flavour to the card. The core of Nozdormu's
design is "make the game feel fast" - what better than than faster animations?

Pros:

* Elegant
* More flavour
* Supported by Unity
* Technically a buff to an underplayed card

Cons:

* High-risk of bugs (graphics, glitches etc)
* Animations now have to be tested at high speed as well
* Doesn't actually fix the issue - just hides it better.


### "Turn Begin" packet

In the protocol, "Turn End" is an option sent by the player and its outcome is various
changes to the game state, through action packets. There is currently no "Turn Begin"
packet.

If there were one, the client's animation queue could acknowledge the "end turn" once
all the animations have been processed and *then* send the turn begin packet.

However, this is completely exploitable. If it were done that way, the client would
essentially be in control of when the turn starts. Evil clients could stall games!

So this would have to be done with a short timeout. Still, very risky.

Pros:

* Turn timers are now actually exact
* Removes the need for a turn timer slush entirely
* A lot of hacks could probably be removed
* Improves the mobile experience as well

Cons:

* Not easy to implement
* Very exploitable
* Even with a timeout, can still be abused to always give more time to the player
* Changing the protocol for the sake of a single card is not a great idea


### Redesign the card

In game design, just like in software engineering, if something is broken and can't be
fixed it usually has to be removed. In Hearthstone's case, this would mean changing the
card text to something that doesn't exhibit the same issues.

Pros:

* The ultimate fix - problem is gone for good
* Free reign for a fun new mechanic!

Cons:

* Conflicts with current design philosophy of leaving cards alone
* A Hearthstone icon and unique effect is gone (soul of the cards!)
* Slushes still needed

[![Custom Nozdormu](/images/nozdormu-fixed.png)](/images/nozdormu-fixed.png)


All in all, Nozdormu is not as easy to fix as people would believe. Nothing ever is.


Jerome
