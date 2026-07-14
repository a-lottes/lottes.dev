---
title: "One Person, a Whole Team: How aSPARK Turns Claude Code into an Agile Delivery Process"
description: Why I built an agile AI team as a Claude Code plugin, how the SPARK loop works, and what happened when I ran a real feature through it.
date: 2026-07-13
draft: false
translationKey: aspark-one-person-whole-team
tags:
  - agents
  - agentic-workflows
  - claude-code
  - best-practices
---
**Coding agents have solved speed. They have not solved reliability.**

aSPARK is my answer to that gap: a Claude Code plugin that puts a full agile team — Product Owner, Designer, Engineering Manager, Reviewer, QA Tester, Release Manager — around a single developer, and forces every feature through a gated delivery loop. This post explains the idea, walks through the SPARK loop, and shares a field report from running a real feature through it in one of my own projects.

## Why This Matters

If you work with a coding agent today, you are fast. Frighteningly fast.

But as a solo developer you are also, simultaneously, the product owner, the architect, the reviewer, and the QA department. In practice, some of those hats stay on the shelf. The agent builds what you asked for — immediately, confidently, and without anyone ever asking whether it was the right thing to build, whether the plan made sense, or whether anyone tested it beyond the happy path.

That is the quiet failure mode of "vibe coding": the bottleneck moves from writing code to everything around the code. Speed is solved. Discipline is not.

## The Idea: Roles as Agents, Ceremonies as Skills

Real software teams don't rely on one brilliant generalist. They rely on specialized roles with explicit handovers: someone challenges the requirements, someone plans, someone builds, someone reviews, someone tests, someone ships.

aSPARK translates that structure into Claude Code:

- **Six agents** embody the roles: Product Owner, Designer, Engineering Manager, Reviewer, QA Tester, Release Manager.
- **Skills act as the ceremonies**: `/story-time`, `/look-and-feel`, `/sprint-plan`, `/increment`, `/peer-review`, `/demo-day`, `/go-live`.
- **One orchestrator**, `/spark`, runs the whole loop end to end — pausing at every gate for a human decision.

The point is not role-play. The point is separation of concerns: the agent that reviews the code is not the agent that wrote it, and the agent that challenges your idea has no stake in building it.

## The SPARK Loop

Every feature travels through five phases, and each phase ends at a gate:

1. **Specify** — the Product Owner interrogates the idea and turns it into a spec with testable acceptance criteria; the Designer reviews usability where a UI is involved.
2. **Plan** — the Engineering Manager produces an architecture decision (including rejected alternatives), an ordered task breakdown, and a test strategy.
3. **Act** — the increment is built, strictly following the approved plan.
4. **Review** — a Reviewer audits the diff; a QA Tester validates the running app in a real browser, beyond the happy path.
5. **Keep** — the Release Manager runs pre-flight checks, writes the changelog, and ships.

Two properties make this a process rather than a pipeline of prompts:

- **Every phase produces an artifact** — `spec.md`, `plan.md`, `review.md`, `qa.md`, `release.md` — stored in a `.spark/<feature>/` folder inside your project. The decision trail is readable, reviewable, and versionable.
- **Every gate requires *your* decision.** The loop never advances on its own authority. When a gate fails, the loop escalates backward — a failed review sends work back to the plan or the build, not into a merge.

You remain the human in the loop. You just stop being the *only* control instance in the loop.

## Field Report: One Feature Through the Loop

Theory is cheap, so here is what actually happened when I ran a real feature through aSPARK in **Datrivo**, a photo-recovery tool I am building (not yet released). The feature: recovering photos in the modern formats that iPhones and Android devices produce today.

### Specify: the AI fact-checked my backlog

I kicked off `/story-time` with what I thought was a well-understood backlog item — phrased, as developer requests usually are, as a solution: "we need a real carver for this format."

Two things happened that I did not expect.

First, the Product Owner refused to accept my solution as a requirement. It translated the request into the underlying need — *users must get their photos back intact, correctly named, and honestly labeled* — and recorded my original phrasing separately, as required by its no-solutions rule.

Second, and more remarkably: the PO investigated the codebase and **disproved the premise of my backlog item**. The problem I believed we had — certain files not being found at all — had already been solved months earlier. The *actual* gaps were different ones: one format was being recovered under a wrong name, and perfectly intact photos were being flagged as "possibly incomplete," quietly eroding user trust.

The feature was re-scoped before a single line of code was written. On my own, I would have built a solution to a problem that no longer existed.

The Specify phase also produced three explicit decisions that were escalated to me at the gate — including consciously deferring one sub-requirement to a later cycle, documented as its own "Won't, this cycle" story so the *no* is recorded rather than forgotten. The Designer review was marked N/A with a written justification (no new UI surface), instead of silently skipped.

### Plan: a decision without alternatives is a guess

`/sprint-plan` handed the approved spec to the Engineering Manager, and the resulting plan surprised me in a different way: not by what it decided, but by what it *documented*.

The architecture decision came with three explicitly rejected alternatives, each with a reason. The cheapest option — patching what was already there — was rejected because it demonstrably could not satisfy the acceptance criteria from the spec. Pulling in an external library was rejected under the rule that every dependency is a liability, since the part we actually needed was small enough to own. And the maximum solution — full validation with heavyweight dependencies — was rejected as gold-plating, out of proportion to the feature. The plan gate literally enforces this: *"a decision without alternatives is a guess."*

The rest of the plan followed the same discipline. Eight ordered tasks, each mapped to a user story, each with a checkable definition of done — and the story we had deferred in Specify got no tasks at all, *by design*. The test strategy explicitly named what automated tests cannot prove (does the recovered photo actually open for a real user?) and delegated exactly that to the manual QA session, with a written justification for why that is the proportionate check rather than a shortcut.

My favorite detail sat in the risk table: the top-ranked risk was that the new "honest" completeness label could itself lie. The mitigation rule: when in doubt, stay conservative — never falsely report success. A team that plans for the failure modes of its own trust signals is doing something right.

### Act: a deviation is documented, not smuggled in

`/increment` worked through the eight tasks in order, and the build itself was uneventful — which is the point of a good plan. The interesting moment was a conflict: two statements in the approved documents contradicted each other on an edge case. Both had passed gates. A solo developer in flow would have picked one silently and moved on.

Instead, the builder resolved the conflict in favor of the *testable* acceptance criteria, recorded the deviation in the plan with its reasoning, and covered the decision with a test. Later, the Reviewer explicitly assessed that deviation and accepted it in writing. Nothing was smuggled in; every departure from the plan left a trace someone else could audit.

### Review: the risk table came true

`/peer-review` did not just read the diff. The Reviewer ran the full test suite and then wrote its *own* probe to exercise edge cases the committed tests did not cover — and that probe found something the developer's tests had missed.

The finding was exactly the failure mode the plan's risk table had predicted: an edge case in which a damaged file would have been falsely reported as intact. The one thing the feature existed to prevent — a trust signal that lies — had a hole in it. The companion finding was the matching test gap, which is *how* the hole had slipped through.

Just as telling was what the Reviewer did next: nothing. Because the fix involved a design choice, the findings went back to the developer instead of being patched in place by the Reviewer. Fix, re-review, two new tests pinning the behavior. Two cosmetic nits remained open — documented and explicitly accepted, rather than silently forgotten.

### QA: the review passed — and the demo still failed

Here is the part that convinced me the roles genuinely see different things.

The code review had passed. Then `/demo-day` ran the actual compiled product the way a user would — and **failed the gate** on two Major bugs:

- Files shaped like real-world data (not like the simplified test fixtures) were misidentified, producing a phantom duplicate under the wrong name — the exact bug class this feature was built to eliminate.
- The honest completeness signal — the headline of the whole feature — was computed correctly internally but *invisible in the product's actual output*. Every unit test passed; a real user would never have seen the feature work.

The loop did what a loop is for: escalated back to the build phase, and after the fixes, QA re-ran everything — round two passed, closing with the question the QA agent asks itself: *"Would I demo this to a stakeholder right now? Yes."*

QA also documented what it *couldn't* verify with synthetic test data, recording it as a known limitation instead of glossing over it — an honest boundary rather than a green checkmark.

The lesson I keep coming back to: the Reviewer found a bug in the *code*; QA found bugs in the *product*. Neither would have caught the other's findings. That is the argument for separate roles in one sentence.

### Keep: the release that refuses to push itself

`/go-live` closed the cycle — and behaved less like an eager deploy script than like a careful release manager. The pre-flight checks were run *fresh* on the release commit instead of being copied from the earlier reports: full test suite again, both builds again, plus a check that nothing unrelated was bundled in. The changelog came out in user-facing language — what can users do now that they couldn't before — with commit hashes and jargon explicitly banned.

Two details stood out. The release commit was deliberately scoped: only the feature's files, staged by explicit path, while known pre-existing issues elsewhere in the repo were recorded as follow-ups instead of being swept into the release. And the rollback path was written down *before* anything ships, under the rule stated in the artifact itself: *"a release you can't roll back is a bet, not a release"* — including a fix-forward rule that a post-release defect goes back through the entire loop as the next version, never as a hot patch on the release commit.

The very last step is my favorite. The Release Manager prepared everything — version bump, scoped commit, local tag — and then *stopped*. Every outward-facing command (push, PR, publish) is staged in the release note but explicitly not executed, awaiting the user's go. Since Datrivo is not public yet, that is exactly where the cycle rests: done-done, except the button press. Which is the point — the loop never takes the one irreversible step on its own authority.

And because Keep is the K in SPARK, the phase recorded the cycle's learnings: what went well (the hands-on QA step "earned its keep"), what to do differently (adversarial tests belong *with* the code, not after a reviewer finds the hole), and reusable patterns for future cycles — including the lesson QA taught us: never compute a quality signal without also proving it reaches the user.

### What the gates caught, in total

One feature, one cycle: an outdated backlog premise killed before any code, a solution reframed as a need, three architecture alternatives rejected in writing, one plan conflict resolved transparently, one trust-signal hole caught by review, two user-visible Major bugs caught by hands-on QA after the review had passed, and a release prepared with a written rollback path and recorded learnings — stopping just short of the one irreversible step, which stays human. Every one of those catches happened *before* release — and every one is written down in five markdown files I can reread six months from now.

## When the Overhead Pays Off — and When It Doesn't

An honest assessment, because a gated process is not free:

**Worth it:** features with real risk — anything touching data integrity, anything user-facing, anything where "it seems to work" has burned you before. In the Datrivo example, the Specify phase paid for itself by killing an outdated assumption before it became code — and demo-day caught two user-visible bugs that an entire green test suite and a passed code review had missed.

**Not worth it:** one-line fixes, typos, mechanical refactors. Running a six-role ceremony over a `README` typo is theater. aSPARK is deliberately modular — you can invoke a single phase (say, just `/peer-review` on a diff) without the full loop.

The rule of thumb I have settled on: if I would want a second pair of eyes from a human colleague, I run the loop.

## Getting Started

aSPARK is open source and installs as a Claude Code plugin in two commands:

```
/plugin marketplace add a-lottes/aSPARK
/plugin install aspark@aspark
```

Then either run individual ceremonies per phase, or start `/spark` and let the whole team take a feature from idea to release — with you deciding at every gate.

The repository, including full documentation of the agents, skills, and gate rules: [github.com/a-lottes/aSPARK](https://github.com/a-lottes/aSPARK)

## Conclusion

Coding agents made building fast. aSPARK is my attempt to make it *trustworthy* — not by slowing the agent down, but by surrounding it with the same structure that makes human teams reliable: specialized roles, explicit handovers, quality gates, and a written decision trail.

In one line:

One person plus aSPARK works like a whole team — and the difference shows up not in how fast you build, but in what you catch before you build it.

Feedback, issues, and pull requests are very welcome.
