# sjf4j-org

Website: [sjf4j.org](https://sjf4j.org) — official documentation and landing page for [SJF4J](https://github.com/sjf4j-projects/sjf4j).

Built with [VitePress](https://vitepress.dev/). Documentation is written in Markdown and compiled to static HTML.

## Prerequisites

- [Node.js](https://nodejs.org/) 18+

## Setup

```bash
npm install
```

## Local Development

```bash
npm run docs:dev
```

Then open <http://localhost:5173> in your browser. Changes to `.md` files are reflected in real time.

## Build

```bash
npm run docs:build
```

The static site is generated into `.vitepress/dist/`.

## Preview Production Build

```bash
npm run docs:preview
```

## Writing Docs

All documentation lives in Markdown files:

| File | Content |
|---|---|
| `index.md` | Homepage |
| `docs/obnt-and-jojo.md` | OBNT & JOJO introduction |
| `docs/basic-operations.md` | JsonObject, JsonArray, NodeStream |
| `docs/jsonpath.md` | JsonPath & JsonPointer |
| `docs/jsonpatch.md` | JsonPatch |
| `docs/jsonschema.md` | JsonSchema & @ValidJsonSchema |
| `docs/benchmark.md` | Benchmark results |
| `docs/faq.md` | FAQ |

To add a new page, create a `.md` file and add it to the sidebar in `.vitepress/config.mts`.
