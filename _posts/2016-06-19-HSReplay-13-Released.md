---
layout: post
title: HSReplay 1.3 Released
permalink: /blog/hsreplay-13-released/
---

HSReplay 1.3 has been released.

Changes since HSReplay 1.2:

* The recommendation for timestamp format is now per RFC3339. There are no
  practical consequences to this on existing replays, but parsers can now be a
  lot stricter about what they accept as a valid timestamp. ISO8601 time-only
  format is still acceptable as a fallback if the date is not available at all.
* The `entity` attribute on the `MetaData` element has been renamed to `data`.
  It is now a NMTOKEN. It is only treated as an entity in the case of `JOUST`,
  so the spec no longer cares about it.


The DTD for HSReplay 1.3 format is available here:

<https://hearthsim.info/hsreplay/dtd/hsreplay-1.3.dtd>

The [PyPI package](https://pypi.python.org/pypi/hsreplay) has been updated.


Jerome
