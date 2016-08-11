---
layout: post
title: How We Process Replays
permalink: /blog/how-we-process-replays/
---

We're finally releasing [HSReplay.net](https://hsreplay.net) into public beta!
With that, I wanted to give a short overview of how replays are ingested and processed behind the scenes.

The flow, in a nutshell:

1. A game is played with [logging enabled](https://github.com/jleclanche/fireplace/wiki/How-to-enable-logging).
2. The `Power.log` file for the game is uploaded, with a bunch of metadata about the game.
3. An "upload request" is created, its URL is returned to the original client.
4. The upload request is processed into an [HSReplay](/hsreplay/) file and a Game Replay DB object.
5. The replay's URL is created and the upload request now redirects to it.


## Considerations

Our two main goals when architecturing this were *speed* and *reliability*.

The simplest version of the flow would look like `Upload game with metadata` -> `Return processed game URL`.
However, replay processing is an operation which can take some time - parsing the log, creating the database
object, etc. So to prevent the server from going down under any kind of load, we decided to use
[Amazon Lambda](https://aws.amazon.com/lambda/).
Using Lambda, we offload replay processing to separate machines which are spun up on demand - each machine
gets a single replay to process.

Now, we had to separate the concept of an "upload request" (the input), from the "game replay" (the output).
In the first version of that, when the game is uploaded, we store the file and the metadata in the `UploadEvent`
object. This returns immediately with a unique upload URL. A new Lambda is then spun up to process that replay;
once that completes, the original upload is then linked up to the resulting game, so that the URL now redirects
to the correct game.
If processing fails for whatever reason, it is instead updated to show the relevant error.

This design allowed us to easily *re-process* replays directly from their original upload. This is useful if,
for example, there is a bug in the parser which generated corrupt files.
On top of that, it allowed us to return URLs without having to wait for the whole game to be generated. We did
not want to share URLs between `UploadEvent` and `GameReplay`, seeing as uploads can fail or, in the case of
de-duplicated uploads, link to existing games.

## Database-less design

When we did our initial load tests against the site, we found that at peak database capacity, uploads would fail
because they could not be saved to the database - they would therefore be rejected.
Upgrading the database is easy, but we wanted to do better. DB migrations, maintenance and such can interfere
with the upload and that means losing games while the service is down. We started working on a new upload flow.

We came up with a way to offload the initial upload request entirely to [S3](https://aws.amazon.com/s3/), which
we were already using to store our uploads and replays:

1. The client initially sends an upload request to [Amazon's API Gateway](https://aws.amazon.com/api-gateway/).
   This upload request contains *only* the authentication credentials and the game's metadata.

2. The Gateway triggers a minimal Lambda which losslessly saves the upload request to a *descriptor*. It then
   generates an *S3 PUT URL*, which the client can use to upload the game's log directly on the S3 bucket. It
   also generates an initial `shortuuid`, which is used as the upload's unique ID from this point on.

3. The S3 upload triggers a notification, which spins up a second Lambda. This Lambda validates the metadata
   against our API and creates the `UploadEvent` in the database accordingly. If this succeeds, the initial S3
   metadata is deleted. If it fails, it is instead moved to a "failed" prefix, allowing us to inspect the issue.

4. Another notification is triggered to spin up a third Lambda, which takes the UploadEvent's log file and
   parses it, creating a final HSReplay file the `GameReplay` object. The initial UploadEvent is updated with
   that game's URL, as before.

Suddenly, the site was a lot more reliable. Every step of this process gracefully fails without any data loss
incurring. Every failed step can be reprocessed. Processing can even be paused should we need to go into a
maintenance mode, replays will merely accumulate into the S3 bucket and can be processed later on.

Lastly, creating the Upload's ID early on means we decide on a unique URL extremely early in the process. We
return that URL to the client before the log file has even been uploaded, in the form of a "promise". This
allows uploads to feel *extremely fast* from the client's perspective, as uploads can start invisibly early on
(eg. during the end of the game) and only display to the end user once all of the game's animations have
completed.
This is what we do in HDT; by the time we show the notification, games have generally already been processed,
making uploads completely instantaneous from the player's perspective.

You can read about how we improved our Power.log parsing speed to achieve that:
[Fast Hearthstone Log Parsing](/blog/fast-hearthstone-log-parsing/)

And if you want to see the code, check us out [on Github](https://github.com/HearthSim/HSReplay.net)!

Jerome
