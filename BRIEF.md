# Project Brief: inkwell-theme-default

## What it does
The default Astro SSR theme for Inkwell CMS. Reads Markdown posts from the
filesystem, renders them server-side, and serves a clean blog frontend.

## Who uses it
Anyone installing Inkwell who wants a working frontend without building their
own theme. Also serves as the reference implementation for custom theme authors.

## Stack
- Framework: Astro SSR with Node adapter
- Language: TypeScript
- Content: reads from CONTENT_DIR (Markdown files managed by Inkwell backend)
- Styling: plain CSS — clean, readable, no external CSS framework

## Hard requirements
- Follows the Inkwell theme contract exactly (see inkwell/docs/theme-contract.md)
- Reads post content from filesystem via CONTENT_DIR env var
- Build command: `npm run build`
- Runs as a Node.js SSR server after build
- Respects `draft: true` and future `publishDate` — never renders unpublished posts

## I don't care about (AI can decide)
- Color scheme — clean light theme is fine
- Font choice — system font stack is fine
- Folder structure — follow Astro conventions

## Out of scope (not in this version)
- Search
- Comments
- Dark mode toggle
- RSS feed
- Pagination
- Tag pages
- Analytics
