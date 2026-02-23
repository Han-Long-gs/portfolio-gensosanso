---
title: "My Portfolio Website"
date: "2026-02-25"
readTimeMinutes: 3
---

> This project is a small-scale static website. The project itself is not particularly complex, but it marks a methodological upgrade for me — from "implementation-oriented" to "product and systems-oriented." This is the first time I designed for future maintainability rather than one-time delivery, and I want to document my thinking process.

## Premise

Before starting any design work, I spent a few hours asking myself a simple question: what kind of system do I want this website to be?

Instead of starting from the tech stack as I usually would, or jumping straight into writing code, I wanted to answer its preconditions clearly first. This approach of starting from constraints is something I learned during my internship, and I'm glad I was finally able to apply it to my own project.

My answers were:

1. This is a personal website. The core of a personal website is content expression, not the interface itself. Therefore, even with a desktop OS visual metaphor, it must remain a **content-first SPA** at the product level, not a full OS simulation.
2. This website will exist long-term and continue to grow. Articles will be revised in the future, so **content structure must be decoupled from UI implementation**: to avoid returning to the component layer every time new content is added, which would create unnecessary maintenance overhead.
3. As a bilingual author, **multilingual support** needs to be considered from the start of design, not added as a later feature, otherwise it could complicate future expansion.

These premises don't sound complex, but they almost entirely determined all subsequent interaction and architecture decisions.

## Interaction First

After clarifying the premises, I didn't immediately start writing code. I first designed the UI in Figma (also my first time using Figma). I defined not just the global color scheme and each component's style and behavior, but also walked through the complete interaction flow: [My Figma Design](https://www.figma.com/design/JQV6YEhwu96WsTQtTfoNJK/Portfolio?node-id=0-1&t=c6I5yGrgn7J3ggcc-1)

At first I thought I was just doing visual design, but I quickly realized this step was actually forcing me to answer more fundamental questions about system behavior: how are each component's behaviors constrained across different states? What behaviors are valid in what states? Do different components have the same priority? These questions seem like interaction details, but they are fundamentally about defining the system's state machine.

Since this system has a limited number of global variables and all icon behaviors are highly isomorphic, after completing the Figma design I chose to define the state machine using the Projects icon flow as an example:
![State machine using Projects flow as example](/content-images/portfolio-statemachine.png)

This step was the first time I truly understood that interaction design isn't just about deciding how an interface looks — it's about making system behavior explicit. Once these states and transition rules were defined, the subsequent architecture design and code implementation became almost a straightforward mapping process.

## Architecture Design

This section focuses on two key decisions at the content layer, both driven by Premise #2, and built on an important precondition: a personal portfolio website has a limited content scale, primarily displaying around 20 articles. If content scale grows, a different architecture would be needed.

### Simplified Sequence Diagram

![Simplified Sequence Diagram (data flow)](/content-images/portfolio-seqDiagram.png)

### Decision 1: Unidirectional Data Flow

All `.md` content files are parsed at startup and organized into a `contentMap` keyed by language and section. UI components only read from `ContentContext` for rendering. Components don't touch the files directly — the content layer and presentation layer are strictly separated in responsibility.

### Decision 2: Choosing Markdown as the Content Medium

The key reason I chose Markdown is its pleasant writing experience, and its syntax naturally maps to the semantic structure of HTML. Using **react-markdown**, I can uniformly inject custom styles into the semantic nodes of the source content, enabling: as long as the `.md` is written well, the UI automatically generates consistent, beautiful, and controllable typesetting. Adding new content is essentially equivalent to adding a new file, not adding new UI logic.

## Next Steps

The desktop OS metaphor carries a cost: it's unfamiliar, and it's desktop-only. Both problems have the same consequence: the user bounces before engaging with any content. That's what makes these two the most urgent:

1. Mobile support
2. First-visit onboarding: a lightweight (skippable) guide that resolves the unfamiliarity on first visit.

---

*This project is still in progress. The article you are reading right now is being served by the very same system described above.*
