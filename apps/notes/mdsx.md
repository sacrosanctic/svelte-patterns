# Introduction - MDSX

[Skip to main content](#main-content)

-   [Svecodocs](/docs)

-   [Introduction](/docs)
-   [Getting Started](/docs/getting-started)
-   [Releases](https://github.com/svecosystem/mdsx/releases)

Concepts

-   [Blueprints](/docs/concepts/blueprints)
-   [Custom Components](/docs/concepts/custom-components)
-   [Frontmatter](/docs/concepts/frontmatter)
-   [Syntax Highlighting](/docs/concepts/syntax-highlighting)

Recipes

-   [Copy Button](/docs/recipes/copy-button)
-   [External Links](/docs/recipes/external-links)
-   [Shiki Integration](/docs/recipes/shiki)

API Reference

-   [MDSXConfig](/docs/api-reference/mdsx-config)
-   [rehype-custom-highlighter](/docs/api-reference/rehype-custom-highlighter)

Toggle Sidebar Search Docs ... ⌘ K

[](https://github.com/svecosystem/mdsx)

On this page

-   [Why MDSX?](#why-mdsx)
    -   [Easy](#easy)
    -   [Efficient](#efficient)
    -   [Extensible](#extensible)
-   [Key Features](#key-features)
-   [What's Missing?](#whats-missing)
-   [What's Next?](#whats-next)

On this page

# Introduction

A markdown preprocessor for Svelte.

Writing content is hard. Writing content in HTML is even harder. Markdown is a great way to write content, but it's not always enough. Sometimes you need to add a bit of interactivity to your content, or you need to add a bit of content to your interactivity. That's where MDSX comes in.

MDSX is a markdown preprocessor for Svelte - it does exactly what you need and nothing more. Just the essential bridge between markdown and components. You can use it to write markdown files that can be imported into your Svelte components, or import Svelte components into your markdown files.

## [](#why-mdsx)Why MDSX?

When we set out to build MDSX, it was important for us to make it easy, efficient, and extensible, without sacrificing one for the other.

### [](#easy)Easy

There's the developer standard for easy, and then there's the user standard for easy. MDSX checks both boxes. You can use it as-is, without any configurations or plugins. Just add it to your preprocessor list and you're off to the races. If you want to customize it, that's easy too.

### [](#efficient)Efficient

It shouldn't *feel* like you're using a markdown preprocessor. We're striving for near-instantaneous processing and compilation times, so you can stay in flow. No unnecessary overhead, just fast, direct processing.

### [](#extensible)Extensible

MDSX leverages the [Unified](https://unifiedjs.com/) ecosystem, making it highly extensible and customizable. You can use the many plugins that have already been built for [remark](https://github.com/remarkjs/remark) and [rehype](https://github.com/rehypejs/rehype), or if you're up for some AST traversals, you can write your own. The world is your oyster.

## [](#key-features)Key Features

-   Svelte Components in Markdown - Use any Svelte component directly in your markdown
-   Markdown in Svelte Components - Import any markdown file directly in your Svelte components
-   Frontmatter Support - YAML frontmatter with automatic metadata export
-   Blueprint System - Create reusable layouts and component overrides
-   Plugin Ecosystem - Full access to remark/rehype plugins
-   Hot Reload - Instant updates during development
-   Zero Bloat - Only includes what you actually need

## [](#whats-missing)What's Missing?

We're just getting started. MDSX is the foundation, but we're building something bigger - an entire ecosystem of plugins, integrations, and tools that will make creating content sites with Svelte the best experience out there. Think themes, collections, primitive components, and everything else you need to ship fast and ship well.

The vision? A world where building content sites with Svelte feels like cheating. We're not there yet, but we're building the tools to get us there.

## [](#whats-next)What's Next?

Ready to get started? Check out the [Getting Started](/docs/getting-started) guide for a complete setup walkthrough, or dive into [Blueprints](/docs/concepts/blueprints) to learn about MDSX's most powerful feature.

We want MDSX to be the foundation of a thriving content ecosystem for Svelte, and we're excited to see what you'll build with it.

© 2026 [Svecosystem](https://github.com/svecosystem)