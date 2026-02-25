---
layout: home

hero:
  name: SJF4J
  text: Simple JSON Facade for Java
  tagline: Enjoying JSON‑oriented Java development
  actions:
    - theme: brand
      text: Get Started
      link: /docs/obnt-and-jojo
    - theme: alt
      text: View on GitHub
      link: https://github.com/sjf4j-projects/sjf4j

features:
  - icon: 🌳
    title: Object-Based Node Tree
    details: All nodes are native Java objects — Map, List, POJO, JOJO — no dedicated AST. One unified tree for JSON, YAML, Properties, and in-memory data.
    link: /docs/obnt-and-jojo
  - icon: 📦
    title: JsonObject & JsonArray
    details: Rich, JSON-semantic APIs for access, mutation, and type conversion — getXxx(), getAsXxx(), put(), remove(), toBuilder() and more.
    link: /docs/basic-operations
  - icon: 🔭
    title: JsonPath & JsonPointer
    details: Full RFC 9535 JSON Path and RFC 6901 JSON Pointer support with filters, functions, wildcards, slicing, and path-based mutations.
    link: /docs/jsonpath
  - icon: 🔧
    title: JsonPatch
    details: Complete RFC 6902 JSON Patch plus RFC 7386 Merge Patch — diff, apply, and extensible patch operations.
    link: /docs/jsonpatch
  - icon: ✅
    title: JsonSchema
    details: Full JSON Schema Draft 2020-12 compliance. Validate POJOs, JOJOs, Maps, Lists natively — no intermediate conversion needed.
    link: /docs/jsonschema
  - icon: ⚡
    title: High Performance
    details: Only 5–10% overhead over native JSON libraries, with near-native reflection via lambda-based access. JMH benchmarked.
    link: /docs/benchmark
---

<div class="vp-doc" style="max-width: 688px; margin: 0 auto; padding: 2rem 1.5rem;">

## Quick Install

```groovy
// Gradle
implementation("org.sjf4j:sjf4j:{version}")
```

## Overview

**SJF4J (Simple JSON Facade for Java)** is a simple facade over multiple JSON libraries, providing a unified semantic layer for structured data processing grounded in JSON specifications.

Rather than reinventing the wheel, SJF4J sits on top of popular parsers — Jackson, Gson, Fastjson2 — and exposes a consistent, expressive API across all of them. You switch parsers by swapping a dependency; your application code stays unchanged.

Beyond JSON, SJF4J also supports **YAML** (via SnakeYAML), **Java Properties** (built-in), and a unified in-memory **Object-Based Node Tree (OBNT)** that lets you work with plain Java objects using the same JSON-semantic APIs.

- **JsonObject / JsonArray** — primary entry points with rich APIs
- **JsonPath** — full RFC 9535 JSON Path and RFC 6901 JSON Pointer support
- **NodeStream** — declarative, stream-based traversal
- **JOJO** — hybrid domain models combining typed fields and dynamic JSON access
- **JsonPatch** — RFC 6902 patch, diff, and merge
- **JsonSchema** — full JSON Schema Draft 2020-12 compliance

## Getting Started

SJF4J requires only **JDK 8** and has no external dependencies.

To handle **JSON** data, add `Jackson`, `Gson`, or `Fastjson2` to your classpath. The first available parser in this order will be automatically used. If none are detected, SJF4J falls back to its own simple built-in parser.

To handle **YAML**, simply include `SnakeYAML` in your classpath. For **Java Properties**, there is a built-in parser.

SJF4J can also be used **without parsing any external data** — it operates directly on in-memory object graphs via the OBNT.

<div style="display:flex; gap:0.75rem; flex-wrap:wrap; margin-top:1.5rem;">
  <a href="/docs/obnt-and-jojo" class="vp-link" style="display:inline-flex;align-items:center;gap:0.4rem;padding:0.55rem 1.25rem;border-radius:8px;font-size:0.9rem;font-weight:600;background:var(--vp-c-brand-1);color:var(--vp-c-white);">Read the Docs →</a>
</div>

</div>
