---
layout: home

hero:
  name: SJF4J
  text: Simple JSON Facade for Java
  tagline: Unifying JSON-Oriented Java Development
---

<div class="vp-doc" style="max-width: 860px; margin: 0 auto; padding: 0.1rem 1.5rem 2rem;">

## Quick Install

<MavenInstallSnippet />

## Overview

**SJF4J (Simple JSON Facade for Java)** is a simple facade over multiple JSON libraries, providing a unified semantic layer for structured data processing grounded in JSON specifications.

Rather than reinventing the wheel, SJF4J sits on top of popular parsers - Jackson, Gson, Fastjson2 - and exposes a consistent, expressive API across all of them. You switch parsers by swapping a dependency; your application code stays unchanged.

Beyond JSON, SJF4J also supports **YAML** (via SnakeYAML), **Java Properties** (built-in), and a unified in-memory **Object-Based Node Tree (OBNT)** that lets you work with plain Java objects using the same JSON-semantic APIs.

- **JsonObject / JsonArray** - primary entry points with rich APIs
- **JsonPath** - full RFC 9535 JSON Path and RFC 6901 JSON Pointer support
- **NodeStream** - declarative, stream-based traversal
- **JOJO** - hybrid domain models combining typed fields and dynamic JSON access
- **JsonPatch** - RFC 6902 patch, diff, and merge
- **JsonSchema** - full JSON Schema Draft 2020-12 compliance

## Features

<div class="feature-grid">
  <div class="feature-card">
    <h3>🌳 Object-Based Node Tree</h3>
    <p>Native Java objects (`Map`, `List`, POJO, JOJO) without a dedicated AST. One unified tree for JSON, YAML, Properties, and in-memory data.</p>
    <a href="/docs/obnt-and-jojo">Learn more</a>
  </div>
  <div class="feature-card">
    <h3>📦 JsonObject & JsonArray</h3>
    <p>Rich JSON-semantic APIs for access, mutation, and conversion with `getXxx()`, `getAsXxx()`, `put()`, `remove()`, and builder workflows.</p>
    <a href="/docs/basic-operations">Learn more</a>
  </div>
  <div class="feature-card">
    <h3>🔭 JsonPath & JsonPointer</h3>
    <p>Full RFC 9535 JSON Path and RFC 6901 JSON Pointer support including filters, functions, wildcards, slicing, and path-based mutations.</p>
    <a href="/docs/jsonpath">Learn more</a>
  </div>
  <div class="feature-card">
    <h3>🔧 JsonPatch</h3>
    <p>Complete RFC 6902 JSON Patch plus RFC 7386 Merge Patch support for diff, apply, and extensible operations.</p>
    <a href="/docs/jsonpatch">Learn more</a>
  </div>
  <div class="feature-card">
    <h3>✅ JsonSchema</h3>
    <p>Full JSON Schema Draft 2020-12 compliance with native validation for POJOs, JOJOs, Maps, and Lists.</p>
    <a href="/docs/jsonschema">Learn more</a>
  </div>
  <div class="feature-card">
    <h3>⚡ High Performance</h3>
    <p>Near-native performance with lightweight facade overhead and lambda-based reflection, verified by JMH benchmarks.</p>
    <a href="/docs/benchmark">Learn more</a>
  </div>
</div>

<div style="display:flex; gap:0.75rem; flex-wrap:wrap; margin-top:1.5rem;">
  <a href="/docs/obnt-and-jojo" class="vp-link" style="display:inline-flex;align-items:center;gap:0.4rem;padding:0.55rem 1.25rem;border-radius:8px;font-size:0.9rem;font-weight:600;background:var(--vp-c-brand-1);color:var(--vp-c-white);">Read the Docs -&gt;</a>
</div>

<style>
.feature-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.9rem;
  margin-top: 0.9rem;
}

.feature-card {
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background: var(--vp-c-bg-soft);
  padding: 1rem 1.1rem;
}

.feature-card h3 {
  margin: 0 0 0.45rem;
  font-size: 1rem;
  line-height: 1.35;
}

.feature-card p {
  margin: 0 0 0.55rem;
  color: var(--vp-c-text-2);
  font-size: 0.92rem;
  line-height: 1.55;
}

.feature-card a {
  color: var(--vp-c-brand-1);
  text-decoration: none !important;
  border-bottom: 0 !important;
  font-weight: 600;
}

.feature-card a:hover {
  text-decoration: underline !important;
}

@media (max-width: 768px) {
  .feature-grid {
    grid-template-columns: 1fr;
  }
}
</style>

</div>
