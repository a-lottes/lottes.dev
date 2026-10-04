---
title: "My agent had no stop condition"
description: "Why a feature loop doesn't fit a migration, what I was missing for long mechanical work, and what an agent that halts on its own looks like."
date: 2026-10-04
draft: false
translationKey: agent-stop-condition
tags:
  - agents
  - claude-code
  - agentic-workflows
---
My loop in aSPARK is built around one user story. Spec, plan, build, review, QA, release, and I make the call at every step in between. For a feature, that's exactly right.

Then there's work that isn't a story. Swapping an old module for a new one, piece by piece. Closing every open Major finding. The goal is a state you can check: everything green. Until you get there, the same move repeats twenty times, forty times.

I had two bad options for that. I could dress it up as a fake story with acceptance criteria nobody needs. Or I could tell the agent "keep going" and watch.

"Keep going" is the prompt that costs me the most trust. The agent has no goal it can check, so it stops when things feel done. It has no budget, so it burns tokens on the third variant of the same fix. And when something that used to work breaks, it quietly patches it along the way instead of telling me that two parts of the work now contradict each other.

What I was missing wasn't more autonomy. It was three things every project with humans takes for granted:

1. a goal a machine can decide,
2. a budget,
3. rules for when to stop and ask.

## Campaigns

In aSPARK that became a campaign. I approve a goal, say "every slice is parity-green", plus iterations, tokens and stop rules. The agent only iterates inside that frame.

The first kind is a migration. An Archaeologist pins the old behaviour as tests that must pass against the old code. A Migrator then moves exactly one slice per iteration and commits only that slice's paths. After that a Parity Verifier checks, in a fresh context, not the one that wrote the code. Only its quoted output may call a slice green.

The moment I built this for came during QA on a small test repo. Slice 1 was green. Slice 2 needed a shared helper to return `float(x)`. The Verifier reported:

```
S1 PARITY-RED add(1, 2): old=3 new=3.0
S2 PARITY-GREEN
S3 NOT-MIGRATED
```

3 versus 3.0 is easy to miss when you click through. The agent halted on stop rule SR-5: a green slice turned red. It left slice 2 committed, wrote down the cause and laid out three options: revert slice 2, re-cut the slices, or another approach. Plus a note that roughly 190k of the 200k tokens were gone.

In a later test run it got nothing but "Please continue it." The answer:

> "Continue" doesn't say which way.

That was the thing I'd been missing. An agent that knows that carrying on is a decision here, not busywork.

## The catch: getting started

Starting a campaign was clumsy. You had to find the installed plugin folder under `~/.claude/plugins/`, name it in the prompt and stitch the template together, because an agent outside a skill can't resolve `${CLAUDE_PLUGIN_ROOT}`. Without the path, in one QA session the agent simply made up a structure of its own. Nobody does that twice voluntarily.

So the second loop is running now: a command, `/campaign <name> [kind]`. It finds the template on its own, asks only what the chosen kind leaves open, and writes a draft `campaign.md`. Approving and starting stays with me. The spec is approved; the rest of the loop is underway.

Two things matter to me here. The agent follows the stop rules; nothing enforces them, because Core is Markdown with no runtime. Only a hook outside the model could enforce them, the way aspark-guard does for the gates, and for campaigns that hook doesn't exist yet. And so far this has run on test repos, not on a real project. Whether campaigns pay off day to day I'll know after the first real migration.

But for the first time I have a tool for long, mechanical work where I don't have to sit next to it to notice when it should stop.

The campaign docs are in the [aSPARK repo](https://github.com/a-lottes/aSPARK/tree/main/campaigns), and the SR-5 moment is also a [60-second video](https://youtube.com/shorts/yD54Mq4JLJw). When a campaign fits and when a story does is on the aSPARK site: [Campaign or story? Where aSPARK draws the line](https://aspark.lottes.dev/en/blog/campaign-or-story/).
