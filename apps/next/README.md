# Style Guide

This docsite consists of 2 parts: Standalone content and Shadow content.

## Standalone Content

Stored in `/src/content/sveltepatterns.dev/`

All files must have YAML frontmatter:

```yaml
---
title: Example Title
category: concept | faq | meta
minimumVersion:
  svelte: ^5.0.0
  sveltekit: ^2.0.0
deprecated:
  version: ^5.1.0
  note: Optional explanation
---
```

### Concept

Acts like a glossary, puts a name to a concept, and something linkable in conversation.

### FAQ

The title is question. And the content aims to answer it.

Start with `# Describe the problem`, then `# Solution` with each solution being an `##` header.

### Meta

maybe this shouldnt be a category

---

## Shadow Content

Stored in `/src/content/svelte.dev`

Shadows URLs from the main site (svelte.dev). Does not duplicate content—just mirrors the URL.

All md files must have a title in frontmatter:

```yaml
---
title: Example Title
---
```

### Community Resources

When making an attribution. It should have a link, author name, and the title. Resources without a publish date cannot be referenced.
