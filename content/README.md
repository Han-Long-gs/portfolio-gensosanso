# Content Writing Rules

## Frontmatter

Every file must start with these three fields.

```
---
title: "Your Title Here"
date: "YYYY-MM-DD"
readTimeMinutes: 3
---
```

| Field | Type | Notes |
|---|---|---|
| `title` | string | Quoted. Used as the display title in the window. |
| `date` | string | Format: `YYYY-MM-DD`. |
| `readTimeMinutes` | number | No quotes. ~200 words per minute. |

---

## Headings

- **Never use `#` h1** in the body — the title from frontmatter is already rendered as h1
- Start from `##` and below

✅ Correct
```md
## Overview
### Details
```

❌ Wrong
```md
# My Article Title
## Overview
```

---

## File Naming

| Type | Pattern |
|---|---|
| Ordered content | `01-slug-name.en.md` / `01-slug-name.zh.md` |
| About / single files | `about.en.md` / `about.zh.md` |

- Always create **both** `.en.md` and `.zh.md` — a missing language file throws at build time
- Slug: lowercase, hyphen-separated only — no dots, underscores, or spaces

---

## Languages

- Both language files for the same article must have **matching structure and frontmatter fields**
- Write the content in the correct language — do not copy-paste the English body into the Chinese file

---

## Folder Structure

```
content/
├── aboutMe/
│   ├── about.en.md
│   └── about.zh.md
├── projects/
│   ├── about.en.md        ← default page when no item selected
│   ├── about.zh.md
│   ├── 01-project.en.md
│   └── 01-project.zh.md
├── wormDiary/
│   └── ...
└── music/
    └── ...
```

Every folder must have an `about.en.md` and `about.zh.md` — this is the default shown when no sidebar item is selected.

---

## Embedding Media

Raw HTML is supported in markdown files. Always include the `sandbox` attribute.

**YouTube**

```html
<iframe width="560" height="315" src="https://www.youtube.com/embed/VIDEO_ID"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  allowfullscreen sandbox="allow-scripts allow-same-origin allow-presentation">
</iframe>
```

**Spotify**

```html
<iframe src="https://open.spotify.com/embed/track/TRACK_ID"
  width="100%" height="152" allow="autoplay; clipboard-write; encrypted-media; fullscreen"
  sandbox="allow-scripts allow-same-origin allow-presentation">
</iframe>
```

Replace `VIDEO_ID` / `TRACK_ID` with the ID from the share URL.
