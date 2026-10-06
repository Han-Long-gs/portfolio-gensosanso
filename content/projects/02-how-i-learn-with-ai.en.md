---
title: "How I Learn with AI"
date: "2026-10-05"
readTimeMinutes: 5
---

> Know how, and know why.

## To deliver, or to learn?

Generative AI is a powerful, versatile tool, and how it gets used depends on the user's intent. Every time I use AI, I ask myself one question: is my intent to deliver, or to learn? The two are very different. Delivery is about producing results that meet the need, quickly and reliably. For example, when I build small everyday tools for myself with a tech stack I already know, I outsource the work to AI, because my goal is to quickly get a tool that works well. But when my goal is to learn, I use AI in a more counterintuitive way. I put layer after layer of restrictions on it so it can't be fully productive (or productive at all), because the point of learning is to explore, fail, and think in unfamiliar territory. That is how I build a mental model of the unknown and turn it into something I know.

I believe delivery can be outsourced, but learning absolutely shouldn't be, and can't be.

## In Practice

On a recent backend project, I made a clear rule in my `claude.md`: the AI acts as a senior engineer, and I'm the intern it mentors. We first broke a project spanning several months into milestones, then into tickets I could finish in a day. The AI can help me plan, assign tickets, flag risks, and recommend relevant technical docs, but I made it clear that it can't write any code (except for unit tests) for me or make key design decisions for me. Whenever architecture choices or design trade-offs come up, it has to hand the question back to me so I can make the call myself, and I have to back it up with sound reasoning.

Soon after the project started, I noticed two workflows I was repeating every day, so I turned them into two skills. `before-ticket` generates a ticket from a fixed template that spells out why the task exists, what the Definition of Done is, which blockers are already known, and which reference docs to read. Then, before I start working, it asks me to restate the DoD in my own words, so that I don't just "get it" on paper but actually know what I need to finish that day.

`after-ticket` comes in after the task is done. It reminds me to check code style, fill in the necessary comments, update my learning log and design docs, and record what ended up happening with the ticket. Then it asks me questions about the task itself to check how much I really understood.

On top of that, I have a `grill-understanding` skill, modeled after the well-known `grill-me`. It goes after the concepts I feel fuzzy about or want to dig into, and tests me with different scenarios to grill my understanding. It's designed for a very dangerous state I've been in countless times: the AI has already explained something, and I feel like I got it, but I don't actually understand it.

For example, I recently started learning RabbitMQ. I noticed that queues can be durable or transient, and messages can be persistent or non-persistent. This confused me, because the two pairs of terms seemed to mean the same thing, so I got curious about what happens in each combination. That set off a grill session. Here's part of the conversation:

**AI:** A persistent message is published to a transient queue. RabbitMQ restarts. What survives?

**Me:** The queue would disappear from the management UI, but the message itself would still survive?

**AI:** No. A message does not survive independently from the queue that contains it. For a classic queue, both conditions matter: the queue must be durable, and the message must be persistent.

Then it changed the scenario.

**AI:** The same persistent message is routed to one durable queue and one transient queue. What happens after restart?

**Me:** The durable queue still exists and contains the message. The transient queue is gone.

Then:

**AI:** A non-persistent message is sent to a durable queue. What survives?

**Me:** The queue survives, but the message is gone.

At that point I could summarize the rule myself:

> For a message to survive a broker restart, the queue must be durable and the message must be persistent. Durability preserves the queue definition; persistence preserves the message.

## Closing Thoughts

Now that AI can quickly handle many coding tasks that used to take junior engineers real time, how should people just entering the software industry learn and grow? Many people say writing code by hand is foolish, that we should let AI do it, and that we should focus on using AI better. But "using AI better" comes with a hidden condition: you need to be capable enough to understand, at a high level, what kind of work you're actually outsourcing. My recent work experience has gradually made me realize that even with the same tools, people's efficiency varies, and I think two variables are at play:

1. How deeply you understand the project's architecture and tech stack
2. How deeply you understand AI-assisted workflows

Learning improves the first variable. Think about how junior engineers gradually grow into senior engineers: they gain experience through practice, and build their own judgment step by step through learning, feedback, and reflection. The bad news is that AI can't copy the judgment that comes from that time and experience straight into our heads. The good news is that we no longer have to dig through Stack Overflow to find the answer to a question. AI can make learning more efficient, but it can't replace learning itself.
