import { defineConfig } from 'vitepress'
import { withMermaid } from 'vitepress-plugin-mermaid'

export default withMermaid(defineConfig({
  title: 'SJF4J',
  description: 'Simple JSON Facade for Java — a unified semantic layer for structured data processing.',
  ignoreDeadLinks: true,
  srcExclude: ['README.md'],

  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
    ['meta', { property: 'og:title', content: 'SJF4J — Simple JSON Facade for Java' }],
    ['meta', { property: 'og:description', content: 'Enjoying JSON-oriented Java development. A simple facade over multiple JSON libraries with a unified semantic layer.' }],
    ['meta', { property: 'og:url', content: 'https://sjf4j.org' }],
    ['meta', { property: 'og:type', content: 'website' }],
  ],

  themeConfig: {
    logo: '/favicon.svg',
    siteTitle: 'SJF4J',

    nav: [
      { text: 'Home', link: '/' },
      { text: 'Docs', link: '/docs/obnt-and-jojo' },
      { text: 'GitHub', link: 'https://github.com/sjf4j-projects/sjf4j' },
    ],

    sidebar: [
      {
        text: 'Guide',
        items: [
          { text: 'OBNT & JOJO', link: '/docs/obnt-and-jojo' },
          { text: 'Basic Operations', link: '/docs/basic-operations' },
          { text: 'JsonPath & JsonPointer', link: '/docs/jsonpath' },
          { text: 'JsonPatch', link: '/docs/jsonpatch' },
          { text: 'JsonSchema', link: '/docs/jsonschema' },
          { text: 'Benchmark', link: '/docs/benchmark' },
          { text: 'FAQ', link: '/docs/faq' },
        ],
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/sjf4j-projects/sjf4j' },
    ],

    footer: {
      message: 'Released under the <a href="https://opensource.org/licenses/MIT" target="_blank" rel="noreferrer">MIT License</a>. JSON Specs: <a href="https://www.rfc-editor.org/rfc/rfc8259" target="_blank" rel="noreferrer">RFC 8259</a> | <a href="https://www.rfc-editor.org/rfc/rfc6901" target="_blank" rel="noreferrer">RFC 6901</a> | <a href="https://www.rfc-editor.org/rfc/rfc6902" target="_blank" rel="noreferrer">RFC 6902</a> | <a href="https://www.rfc-editor.org/rfc/rfc7386" target="_blank" rel="noreferrer">RFC 7386</a> | <a href="https://www.rfc-editor.org/rfc/rfc9535" target="_blank" rel="noreferrer">RFC 9535</a>',
      copyright: '© 2025 sjf4j-projects',
    },

    search: {
      provider: 'local',
    },
  },
}))
