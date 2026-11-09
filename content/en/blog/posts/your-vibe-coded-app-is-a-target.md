---
title: "Your vibe-coded app is a target, not a product"
description: "Why vibe-coded micro-apps aren't a solved problem, how they become the target for agentic development, and why a dark factory needs a target as a contract to ever be done."
date: 2026-11-03
draft: false
translationKey: vibe-coded-app-target
image:
  path: ../../../../public/img/blog/vibe-coded-app-target.jpg
  alt: "A rough app sketch becomes a precise blueprint at the center of a target."
tags:
  - agents
  - claude-code
  - agentic-workflows
---
I'm responsible for delivery on software projects for industrial clients. Over the past year, one thing has changed in almost every company I work with: people got access to AI. Not through a private account on the side, but through a sanctioned tool with a contract, a data policy and a login from IT.

That was the right move. Shadow AI didn't shrink because someone forbade it. It shrank because the official route became easier than the unofficial one.

## Everyone builds now

With access came something nobody planned for. People without a software engineering background started to build. A planner vibe-codes a dashboard for open orders. A quality engineer builds a small app that turns inspection photos into a report. Someone in purchasing replaces three spreadsheets and a weekly email with a micro-app.

These apps work. They solve a real problem, and they were tested where it matters: in the daily work of the person who built them. I find that impressive, and I don't want to talk it down.

## Built is not done

The trouble starts with how this is read. A working app looks like a solved problem. It isn't. It is software, and software has to run somewhere and be kept alive.

Who updates the library with the security issue? Who notices when the export breaks after the next ERP update? Who can change the app when the person who built it moves to another team? Where does the data live, and who may see it?

A vibe-coded app answers none of these questions. Often nobody asked them. The cost doesn't show up when the app is built. It shows up six months later, as an outage, an audit finding or an app nobody dares to touch.

Banning these apps would be the wrong answer. It would push people back into the shadow we just got them out of.

## Read the app as a target

The better reading: a vibe-coded app is a proof of concept, and often a very good one. It shows what the users actually need, in their words and in their workflow. No requirements workshop gets that close.

This is where a software engineer comes in. Not to throw the app away and start over, and not to adopt it as it is. The engineer takes it as the target: this is what the result has to do. In agentic software development, that is exactly what an agent needs. An agent can build a lot, but it has to know what done means.

The prototype gives you that. Each screen, each filter, each export is a behavior you can describe and check. "Shows all open orders older than 14 days, sorted by customer." "Exports the inspection report of a batch as PDF." Those are acceptance criteria. And because the prototype exists, you can test against it: does the engineered version do what the prototype did?

Plugins and skills in a coding harness like Claude Code help with this step. A skill reads the prototype, walks through it with the person who built it and derives features and acceptance criteria, one question at a time. The domain expert confirms what the app has to do. The engineer decides what is a must, what is nice to have and what stays out. What comes out is not a clone of the prototype. It is a contract.

## The target as a contract in the aSPARK Factory

This is where my own work comes in. With [aSPARK](https://github.com/a-lottes/aSPARK) I build agentically, one story at a time, with gates for review and QA. The aSPARK Factory runs that loop in lines, up to a dark mode in which a line proposes its own work, files its own tickets and merges after its gates.

A month ago I wrote that [my agent had no stop condition](/en/blog/my-agent-had-no-stop-condition/). In the Factory the same problem showed up at a larger scale. A line in dark mode always finds something to do. Without a written goal, it cannot tell a project from a product, so it keeps developing.

So a project in the Factory starts with a target, and the target is a contract. A skill in the Factory plugin for Claude Code, `factory-start`, leads the conversation: What is it, and who uses it? Is there an end? What must work for it to be done? How many days may it take? It turns the answers into one file, `.spark/target.md`:

```markdown
# Target: Invoice export v1

Kind: project
Status: active
Started: 2026-11-03
Budget: 20 days

## Features
### F-1 Monthly export (must)
- F-1.1 Exports the invoices of a month as CSV
- F-1.2 Skips cancelled invoices
### F-2 Email delivery (should)
- F-2.1 Sends the export to a configured address

## Out of scope
- Changes to invoices
```

The rules around it are short:

- **Checkable criteria.** Every criterion is something a QA step can observe. Never "fast" or "user-friendly".
- **Must, should, could.** Features carry a priority, and what is out of scope is written down too.
- **A budget in calendar days.** Should features get built only while the forecast still fits the budget.
- **Progress is proven, not estimated.** A criterion counts when a passed QA report names its ID and the change is merged.
- **Work only for open features.** The line proposes tickets only for features that are not done yet.
- **Only a person moves the goalposts.** The line cannot write the target file. A change runs through its own target ceremony and ends as a pull request that a person merges.

## Why a dark factory needs an end

In a dark factory nobody watches every step. That is the point. But it means the factory needs a condition it can check on its own to stop. "The app is good now" is not one. "Every must criterion is proven in a passed QA report" is.

When every must feature is done, the line stops proposing new work and asks once: prepare the release, change the target, or leave it as it is. After the release it switches to maintenance. It fixes bugs and adjusts what people report, but it builds no new features. A used-up budget stops it the same way, before the target is reached.

Without that contract, a dark factory turns into what the vibe-coded app was in the first place: something that keeps growing and that nobody can call finished. With it, development has an end, and operations have a clear start.

## What this means

If your company gave its people AI, don't stop them from building. Treat what they build as the best requirements you have ever been handed. Put an engineer next to it, turn it into a target with checkable criteria, and let it be built and run properly.

If you are an engineer, the prototype is not your competition. It is the spec you always wanted.

This is not a lab setup. The Factory runs today on several machines and builds real projects, in dark mode included. The target contract is what lets me run it that way: I define the end, the line delivers against it, and I step in when it asks. That is how vibe-coded ideas become software that someone can run for years.
