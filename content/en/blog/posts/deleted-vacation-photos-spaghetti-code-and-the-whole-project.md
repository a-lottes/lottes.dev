---
title: "Deleted Vacation Photos, Spaghetti Code, and the Question of Who Is Watching the Whole Project"
description: How deleted vacation photos led to an open-source tool — and how building it revealed a structural problem that hits every team moving from experimenting with coding agents to using them in production at scale.
date: 2026-08-01
draft: false
translationKey: deleted-photos-spaghetti-code-whole-project
tags:
  - agents
  - agentic-workflows
  - claude-code
  - best-practices
---
**This is not a product announcement. It is the story of a problem that nearly cost me two projects — and that will hit every team the moment they stop merely experimenting with coding agents and start using them in production, at scale.**

## It starts with a digital camera

On vacation, my daughter deleted the photos on her digital camera. Accidentally, irreversibly — or so she thought. If you have ever tried to rescue deleted pictures from an SD card, you know the market that opens up at that moment: tools that only reveal after the scan that recovery costs money. Tools with interfaces from another decade. Tools where, as a parent, you genuinely cannot tell whether they will save the card or finish it off.

I did not find a single tool that was both free *and* simple enough to hand to someone who has never opened a terminal. So I decided to build one: [Datrivo](https://datrivo.app) — a photo recovery tool that will be released as open source, so that the next parent in this situation has an honest, free option.

That is the nice part of the story. The actual reason for this post is what happened *while building it*.

## The honeymoon

I am building Datrivo with Claude Code, and the first weeks were exactly what the excitement around coding agents promises. A file carver for a format I had never before seen in a hex editor: one afternoon. A GUI that does not overwhelm my target audience: one evening. Features that used to cost me a week of after-work sessions materialized in hours.

I do not want to talk that down, and if you have not experienced it yet, you should: the speed is real. Which is exactly why what came next is so treacherous — for a long time, it does not feel like a problem at all.

## The break: locally brilliant, globally spaghetti

After several iterations I looked at my own codebase and did not recognize it. Three different places doing the same thing in three different ways. Abstractions contradicting each other. Modules designed past one another — each clean in isolation, a knot in combination.

The classic reflex would be self-criticism: planned badly, built too fast, should have cleaned up along the way. But the longer I looked at it, the clearer it became: this is not a failure of discipline. It is a structural property of the way of working.

Every Claude Code session starts with a task. "Build feature X." "Fix bug Y." And the agent does exactly that — competently, single-mindedly, and **from the perspective of that one task**. A session's context is ephemeral: the architecture decision from session 3 is no longer present in session 12. The convention that emerged in session 5 is unknown to session 9. Every session optimizes locally, and the sum of locally optimal decisions is not a globally consistent system — it is spaghetti with excellent test coverage.

Put differently: **inside the session, the project as a whole has no advocate.** The agent represents the task. I represent — on a good day — the product. But nobody at the table represents the architecture, the consistency, the system as a whole. In human teams, that role is carried by structures that took decades to evolve: reviews, architecture boards, a definition of done, the institutional memory of experienced colleagues. In an agent session, none of that exists by default.

## Why "prompt better" does not fix it

I tried the obvious remedies, and I suspect every serious Claude Code user knows the list:

- **A CLAUDE.md with project context and conventions.** It helps — and it does not scale. The file grows, goes stale, and beyond a certain length it competes with the actual task for attention. Above all, it is *descriptive*, not *enforcing*: nothing compels a session to follow it, and nobody checks afterwards.
- **More disciplined prompting.** "Respect the existing architecture" is wishful thinking when the session has never seen the existing architecture in full.
- **Regular cleanup sprints.** That is refactoring as a standing debt — paying off the erosion after the fact instead of preventing it. Annoying in a hobby project; a budget line item in a production system.

The shared flaw of all three approaches: they try to solve a structural problem with behavior. That does not even work with humans — which is precisely why teams have processes instead of relying on "we will all pay close attention".

## Now multiply that by a team

Up to this point, this is the story of a solo developer and a weekend project. The reason I am writing it down is the multiplication.

What happened to me alone after fifteen sessions happens to a team of ten developers, all working productively with coding agents, within the first week. Ten people, each running several sessions a day, each session optimizing locally — and the rate at which code is produced exceeds the rate at which anyone can check the big picture by an order of magnitude. The bottleneck visibly moves: **generating code has become cheap. Consistency, traceability and oversight are the new bottleneck.**

And real organizations add aggravating factors my hobby project does not have:

- **Brownfield.** Most teams do not start on a green field. They start inside a grown codebase that *no single session has ever seen in full*. Every task is solved against a slice; the side effects on the rest are left to chance.
- **Knowledge decay.** The link between requirement and code already lives in people's heads far too often. Agents make it worse: the chat transcript in which a decision was made is gone when the session ends. What remains is code without a rationale.
- **Audit obligations.** The moment compliance asks which standard applied to which release and who made which decision, "that is how the agent built it" is not an acceptable answer.

Taken individually, these are tooling gaps. Taken together, they are the reason so many Claude Code pilots shine — and then the rollout across the organization stalls.

## What would be needed, structurally

I searched for a long time for something that addresses this problem and came up empty. What exists falls into two categories that both miss the point: coding assistants that optimize *individual throughput*, and process suites that manage *tickets and reporting* but know nothing about the code. The gap between them — the place where the project as a whole would need an advocate — stays empty.

What would a solution have to look like? Stated product-neutrally, I arrived at four requirements:

1. **Decisions must survive the end of the session.** Specs, plans and review findings belong in the repository as artifacts — versioned, readable, next to the code — not in an ephemeral chat transcript.
2. **There must be roles that do not build.** The instance that challenges an idea must have no stake in implementing it. The instance that reviews must not be the one that wrote the code. For humans we call this separation of powers — for agents it is just as necessary.
3. **Hand-overs need gates that can say no.** A process that can be skipped under pressure is folklore. A gate that refuses to start the next phase until the previous one is cleanly closed is structure.
4. **Requirements must be traceable into the code.** When nobody can answer which code fulfills which requirement, the knowledge is already lost — it just takes a while to notice.

None of this is a new insight. It is what functioning software teams have done for decades. The only new insight is that these structures do not come bundled when you adopt agents — you have to rebuild them explicitly, or you are working with a very fast team and no process at all.

## What I built from it

Time for the promised transparency: I built a tool against these four requirements, and of course I am biased. [aSPARK](https://github.com/a-lottes/aSPARK) is an open-source plugin for Claude Code that gives a project exactly this structure: specialized roles (a Product Owner who challenges ideas, a Reviewer who did not write the code, a QA Tester who clicks through the app in a real browser), a five-phase loop with gates, and a written decision trail as Markdown artifacts in the repo.

Whether it delivers on the concept, I tested on my own project: Datrivo features now travel through this loop. The result was more instructive than I had hoped — among other things, the Specify phase buried a stale assumption from my own backlog before any code was written, and hands-on QA caught two user-visible bugs that a fully green test suite and a passed code review had both missed. The full field report — one real feature, all five phases, including the moments the loop slowed me down — is in a [separate post](/en/blog/one-person-a-whole-team-aspark-agile-ai-delivery/).

But the point underneath matters more to me than the tool: even if aSPARK disappeared tomorrow, the problem would remain. Anyone who wants to use coding agents in production at scale — as a team, in brownfield code, under audit obligations — needs *some* answer to the question of who represents the whole project when every session only sees its task.

## An open ending

Datrivo is not released yet — my daughter's vacation photos, by the way, are back. aSPARK is open source and under active development. And the question of how a team works with coding agents productively and sustainably is, in my view, one of the practically most important questions of the coming years — and far from settled.

If you recognize this problem from your own project or team — or have found a different answer to it — I would genuinely like to hear your objections, experiences and ideas.
