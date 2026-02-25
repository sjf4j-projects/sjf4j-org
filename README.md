# sjf4j-org

Website: [sjf4j.org](https://sjf4j.org) — official documentation and landing page for [SJF4J](https://github.com/sjf4j-projects/sjf4j).

## Local Preview

The site is pure static HTML/CSS/JS — no build step required. Just serve the repository root with any local HTTP server.

### Option 1 — Python (built-in, recommended)

```bash
# Python 3
python3 -m http.server 8080

# Python 2
python -m SimpleHTTPServer 8080
```

Then open <http://localhost:8080> in your browser.

### Option 2 — Node.js

```bash
npx serve .
```

Then open the URL shown in the terminal (default: <http://localhost:3000>).

### Option 3 — VS Code Live Server

1. Install the [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) extension.
2. Right-click `index.html` → **Open with Live Server**.

> **Note**: Opening `index.html` directly as a `file://` URL may cause some CDN resources (Mermaid, Prism) to load with mixed-content restrictions in certain browsers. Using a local HTTP server avoids this.
