---
title: "From a 47-Minute Screen Recording to a Narrated Demo — Without Opening a Video Editor"
description: How a raw recording of one aSPARK session became a captioned, branded, narrated 100-second demo the same day — planned from a hash ledger instead of a timeline, rendered with what ships with macOS, and voiced with ElevenLabs.
date: 2026-09-19
draft: false
translationKey: screen-recording-to-narrated-demo
tags:
  - claude-code
  - agents
  - agentic-workflows
---
**I had a 47-minute screen recording and no video editor on a Mac that runs an older macOS. By the end of the same day there was a narrated, captioned 100-second demo on my website and playing inline in a GitHub README. This is how that happened — and why the most important ingredient was a log file I built for a completely different reason.**

<video controls playsinline preload="none"
  poster="https://aspark.lottes.dev/assets/video/aspark-demo-poster.jpg"
  src="https://aspark.lottes.dev/assets/video/aspark-demo-voice.mp4"
  style="width:100%;height:auto;border-radius:12px;margin:1.5rem 0"></video>

## Why a video at all

[aSPARK](https://github.com/a-lottes/aSPARK) turns Claude Code into an agile team: a Product Owner who challenges your idea, a Designer, an Engineering Manager, a Reviewer, a QA Tester who clicks through your app in a real browser, and a Release Manager — with a quality gate between every phase that only you can open.

That is a lot of words. And words were the problem. When I asked Claude for an honest review of the project, the answer was blunt: the README spent four thousand words explaining what the loop does, and not a single second *showing* it. The one thing nobody else does — an agent testing your app in a browser and finding a real bug — was invisible.

So we shortened the README to a third and put one line at the top: `<!-- TODO: 90-second screencast -->`. Then we had to make one.

## Step 1: Design a feature that fits in one sitting

A demo loop has to be real, and it has to be short. Claude set up a tiny demo project — a vanilla-JS todo app, three files, no dependencies — plus a project constitution that keeps every gate lean: one active lens, browser QA, no test framework to scaffold.

Then it proposed the feature: a filter bar with *All / Active / Done* and an "N items left" counter. The trick was in the wording of the idea itself. The one sentence I pasted into `/spark` already answered most of what the Product Owner's clarify pass asks about — boundaries, empty states, keyboard use, what is out of scope — so the Product Owner still pushed back, but a handful of quick answers settled the spec.

I pressed record. Forty-seven minutes later, `todo-filter-bar` was released as `v0.1.0`: specified, design-checked, planned, built, reviewed (the Reviewer found a real focus-ring bug, which got fixed and re-checked), and verified against all 29 acceptance criteria in Chrome, on desktop and at phone width.

## Step 2: Plan the cut from a ledger, not a timeline

Here is the part that made everything else easy.

Forty-seven minutes is about 2,800 seconds of footage. The usual way to find the fifteen seconds worth showing is to scrub through it. We did not scrub once.

aSPARK has a companion plugin, [aspark-guard](https://github.com/a-lottes/aSPARK-guard). Its job is enforcement: it denies a write that would skip a quality gate, and it records **every write to a `.spark/` artifact in an append-only ledger** — with the artifact's SHA-256, its status, the agent that wrote it, and a timestamp. I built it so no gate can be passed silently. I never thought of it as a video tool.

But a ledger with timestamps is a table of contents. Subtract the moment the recording started, and it reads like this:

| In the recording | What happened |
|---|---|
| 1:44 | Product Owner writes the first spec draft |
| 7:32 | Designer adds the design review |
| 12:40 | Engineering Manager writes the plan |
| 23:44 | Reviewer opens the review |
| 37:23 | QA Tester writes the QA report |
| 42:55 | Release Manager prepares the release |

**The ledger from aspark-guard delivered the phase map of the whole session — and that is what made this entire workflow possible.** Claude merged it with the Claude Code session transcript (every gate question and my answer, to the second) and the git log into one timeline. From that, it wrote the storyboard: the `/spark` command, the Product Owner's first hard question, the Designer's findings, each gate, the Reviewer's bug, QA in the browser, the release.

The tool that makes the process auditable also made it *filmable*. I love it when that happens.

## Step 3: Look only where it matters

Only then did we open images — contact sheets of the recording, one tile every two minutes, and cropped stills at exactly the candidate seconds, to check that terminal text would still be readable at 720p.

Those stills caught three things I would never have wanted in a public video: an older version of my own website open in a browser tab (with claims I rewrote later that same day), a new-tab page listing file names from my Google Drive, and my profile picture in the browser toolbar. Every browser crop now starts below the toolbar, and those seconds simply are not in the cut. Claude told me what it left out and why, instead of cutting silently.

## Step 4: Render with what ships with macOS

My Mac runs Ventura. No iMovie, no ffmpeg, no Homebrew. It turned out none of that was needed: Swift and AVFoundation come with the system.

Claude wrote a small render program that takes one JSON file describing the cut: fifteen scenes, each with a source range, a crop (pan-and-zoom into the terminal or the browser), and a speed. The build phase runs at 30×, the gate questions in real time. Every sped-up scene carries a **time-lapse badge** in the corner — a demo that hides its speed-ups is a demo nobody trusts after the first one they notice.

It exports a master, then re-encodes it twice: once under GitHub's 10 MB attachment limit, once at higher quality for the website.

## Step 5: "The font looks a bit dry"

The first cut was correct and plain. I said one sentence — *the typography feels boring, can it be more modern?* — and got a redesign built from my own website: Inter Display and JetBrains Mono loaded straight from the site's font files, the teal-to-orange headline gradient on the wordmark, and caption cards with a role label on top (`PRODUCT OWNER`, `GATE · PLAN`, `QA TESTER`) and one sentence below.

It also added something I had not asked for and now would not want to miss: a **phase tracker** in the top-left corner — *Specify · Plan · Act · Review · Keep* — that lights up the phase you are watching. You always know where in the loop you are.

## Step 6: Give it a voice

Captions alone still felt a bit silent. I have a free ElevenLabs account, so we added narration.

Claude wrote one short spoken line per scene — the caption's twin, not its copy — and a script that sends each line to ElevenLabs separately, passing the neighbouring lines along so the intonation stays continuous. ElevenLabs' MCP connector is linked to my account, but it was not available in this particular session, so the script talks to the API directly; the key sits in the macOS keychain and never appeared in the chat.

Synchronisation turned out to be the easy part, because nothing had to be matched by ear. Every clip is measured to a fraction of a second and placed a third of a second into its scene. If a line is longer than its scene, the scene's time-lapse slows down a little, and the badge shows the new, honest speed. Afterwards, a loudness check of the finished file confirmed the voice starts exactly where the scenes do.

The whole narration cost 871 of the 10,000 free monthly credits, and the free plan's required attribution sits on the closing card.

## Step 7: Ship it

The high-quality version is self-hosted on [aspark.lottes.dev](https://aspark.lottes.dev/en/#showcase). For the README, GitHub wants an attachment uploaded through a browser — so Claude opened an issue in my signed-in Chrome, loaded the file into the comment box without posting anything, took the attachment URL, and verified through GitHub's own markdown API that it renders as a player for anonymous visitors before committing it. The video now plays [right on the repository page](https://github.com/a-lottes/aSPARK).

## What surprised me

Not that it worked. That it worked **without friction in the wrong places**.

The friction was exactly where it belongs: with me. Which feature to show. Whether the design felt right. Whether the voice sounded good. Everything else — the planning, the privacy scrub, the rendering, the checks — happened on its own, and the small things that did go wrong were caught by checks rather than by me: overlay text that rendered as empty boxes in the first pass, an API key that had been saved as the wrong eight characters, a push that choked on a 13 MB video file. Each one surfaced, got named, got fixed.

And the honesty was built in, not bolted on. The badge marks every time-lapse. The cut scrubs what should not be public. The attribution is on the card. That is the same principle aSPARK applies to code: if something is not verified, it does not get to look verified.

## It is a skill now

Everything above now lives in a Claude Code skill: the timeline script that reads the ledger and the transcript, the contact-sheet and render tools, the design spec, the voice-over step, and every gotcha we hit on the way. The next recording is one prompt away: *make a demo video from this screen recording.*

## Try aSPARK

If you use Claude Code and want an agile team around every feature — with gates you decide and a paper trail you can read, diff, and apparently even film:

```
/plugin marketplace add a-lottes/aSPARK
/plugin install aspark@aspark
```

Add [aspark-guard](https://github.com/a-lottes/aSPARK-guard) if you want the gates enforced in code — and the ledger that, as it turns out, is also the best video storyboard I have ever had.

Everything is open source: [github.com/a-lottes/aSPARK](https://github.com/a-lottes/aSPARK). And if you run it on a project of your own, a [field report](https://github.com/a-lottes/aSPARK/issues/new?template=field_report.yml) is worth more to me than any star — especially if it went badly.
