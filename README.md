# inkwell-theme-default

Default Astro SSR theme for [Inkwell CMS](https://github.com/srmdn/inkwell).

Clean, minimal blog frontend. Reads Markdown posts from the filesystem.
Ships with Inkwell out of the box.

## Requirements

- Node.js 18+
- An Inkwell backend with posts in `CONTENT_DIR`

## Setup

```bash
npm install
cp .env.example .env
# Edit .env: set CONTENT_DIR to your Inkwell content path
npm run build
```

## Configuration

| Variable | Default | Description |
|----------|---------|-------------|
| `CONTENT_DIR` | `../content/blog` | Path to Inkwell's content directory |
| `SITE_NAME` | `My Blog` | Site name shown in the header and page titles |
| `SITE_DESCRIPTION` | _(empty)_ | Meta description for the home page |

## Running after build

```bash
node dist/server/entry.mjs
```

Set `HOST` and `PORT` environment variables to control the server address.

## Building a custom theme

See [theme contract](https://github.com/srmdn/inkwell/blob/main/docs/theme-contract.md)
for the full specification.

## License

MIT
