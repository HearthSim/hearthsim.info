---
layout: post
title: Visualizing The Metagame
permalink: /blog/2016/visualizing-the-metagame/
author: Andrew Wilson
hidden: true
---

Ever since we first launched [HSReplay.net](https://hsreplay.net/), we’ve been really
excited with all of the amazing members of the Hearthstone community who have reached out
to us to collaborate on doing analysis on Hearthstone replays.

This week, we’ve partnered up with our friends at [Windrush.io](http://windrush.io/) who
are masters at doing data visualization on the web. In honor of having their great data
visualization skills available to us, we decided it was time for us to take a crack at
visualizing the standard ranked ladder. We were curious to see if we could visualize how
the metagame on ranked ladder changes over time.

HSReplay.net gets several hundred thousand replays uploaded to it every day.
Since we have that much data, we decided to identify the highest win rate decks
for each day during the period from October 11th through October 25th, plot them by % win
rate on the Y-Axis and % popularity on the X-Axis, and then animate how each deck
changes over time.

We specifically looked at the standard ranked ladder from rank 15 through Legend and only
display decks on the days when they had at least 100 wins. This helps us to filter out
unusual decks which might have an artificially high win-rate due to only being played a
handful of times that day.

The lines that divide the grid represent the 50% line for both win rate and popularity.
They split the grid clockwise into four quadrants:

* **Dark Horse Decks (Quadrant I)** - These are high performing but relatively unknown deck lists.
* **Staple Decks (Quadrant II)** - These are the high performing popular decks that
everyone is used to encountering on the ladder.
* **Lemming Decks (Quadrant II)** - These are decks that are popular but lose more often
then they win. If you're playing one of these, you're a lemming.
* **Garbage Decks (Quadrant IV)** - These decks don't perform well and are not commonly played.


{:.center}
|Dark Horse Decks |Staple Decks  |
|:---------------:|--------------|
|Garbage Decks    |Lemming Decks |

Finally, we also added an option to see the same data but visualized by class.
We hope that you enjoy the visualization, and let us know if you’d like to see more like this by
tweeting at [@HSReplayNet](https://twitter.com/{{ site.vars.links.twitter }}).


{% include metagame-viz.html %}


Andrew
