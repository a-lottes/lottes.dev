---
title: "I measured my own tool"
description: "I built a knowledge graph for coding agents and then watched it in real runs. The agents didn't use it. What I learned from that about agents, cost and control."
date: 2026-11-13
draft: false
translationKey: measured-my-own-tool
tags:
  - claude-code
  - agents
  - aspark
---
For a few months I have been building a small family of tools for coding agents. One of them is a graph. It links a project's code to its requirements: the stories, the acceptance criteria, the reviews. The idea is simple. Before an agent changes a file, it should be able to see which requirements depend on it. Including the ones from other features it isn't thinking about at all.

I was convinced of the idea. It sounds so reasonable that for a long time it didn't occur to me to test it.

Two weeks ago I finally did. I wanted evidence for a piece of writing that the graph works. So I had my own software factory work through the same tasks several times. Once with the graph, once without, and once as a single session with no process at all. Every run was recorded, every tool call, every token.

## The graph was there

The setup was clean. The graph ran as a tool in every session, connected and ready. The agent's brief even said explicitly to use it before searching the code.

Then I read the recordings. In the first series, no agent called the graph in any run that had it. Not once.

That was uncomfortable. It was my tool, and I had taken its usefulness for granted. My first guess was a technical fault. There wasn't one. The graph was reachable. It was just ignored.

## Why nobody used it

The causes weren't in the graph. They were in the process around it.

The process my agents follow splits the work into roles. One role plans, one reviews, one tests. Exactly these roles didn't have the graph in their tool list. The hint in the brief only reached the main agent. And the main agent had something more important to do: it started coding.

That was the second surprise. My process says a specification comes first, then a plan, then the code. The recordings showed something else. The agent usually wrote code within the first minute. Specification and plan came afterwards. They documented a decision that had already been made.

The hint was in the brief. The order was in the process. Both were recommendations, and both were skipped.

## What is enforced happens

So I stopped recommending. The factory that starts the agents now enforces the rules itself. A separate planning session runs first, and only then may code be written. Every role that plans, reviews or tests gets a fixed instruction about the graph when it starts. And the factory queries the graph itself. It hands the result to the agent: these stories from other features depend on the files you're about to change.

After that the picture changed. The plan came before the code, in every run. The reviewing roles mostly queried the graph before starting their work. In one run the tester received the list of other features' requirements. It checked and documented each one. No agent had done that before.

For me that is the most important lesson of these days. What I recommend to an agent is a wish. What I enforce happens. A good tool next to an agent is worthless as long as the agent decides on its own whether to pick it up.

## And then it still didn't help

Now the graph was being used. So I wanted to know whether it made anything better. For that I needed a task a single session fails at. The first tasks were no good. The single session solved them as well as the full process.

The third task had 23 hidden tests. They required knowledge that only existed in old project records. The single session missed three tests in every run. The full process missed three, one and none.

I stared at those three numbers for a long time. The spread came down to exactly one decision, and it was made in the specification. In every run the specification was written before any agent asked the graph anything. The graph came too late to decide anything. I couldn't show an effect.

I ended the measurement there. More runs would only have described the spread more precisely.

## What a thorough process costs

The recordings showed something else I hadn't been looking for: the price.

A single session solved a task in about a minute, with a few thousand tokens. The full process with planning, review and testing took a quarter of an hour to half an hour. It used 25 to 42 times the tokens. A large share went to the most expensive models, which I had pinned for planning and review. Several runs stopped because the usage limit ran out.

One caveat belongs here. Three runs configured as the full process never started a single role. They were as cheap as the single session. That, too, I only saw in the recordings.

I don't want to talk the process down. In several runs the review found real bugs that were fixed afterwards. But I paid the full cost for every small change. I'm changing that now. Small changes get a light path: the specification stays, the rest gets shorter. The roles run on a cheaper model by default. The number of review rounds is capped.

## Agents don't tell you what happened

One finding stayed with me more than the cost. At the end of every run the agent summarises what it did. I compared those summaries with the recordings.

Most of the time they didn't match. One agent wrote that review and testing had been skipped. The recording showed both had run and left documents behind. Another reported it hadn't run the slow tests. It had run them.

The agents didn't lie. They summarised from memory, and their memory was imprecise. For me one simple thing follows. I no longer write the close of a run from what the agent believes. I read it from the files that actually exist.

## What I take away

I wanted to prove my tool works. I didn't manage to. What came out instead is something else, and I think it's worth more.

An agent doesn't follow a process because it is written down. It follows it when something outside the model makes it. Tools don't get used because they're there. They get used when the process puts them in the right place. And what an agent says about its own work, I check against what it left behind.

Whether the graph helps when it's asked before the specification, I don't know yet. I'll test it the same way as this time: with recordings, not conviction. This time I learned how easily I let a good idea convince me when it's my own.
