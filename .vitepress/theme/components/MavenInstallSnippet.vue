<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'

const version = ref('latest.release')

const installLine = computed(() => `implementation("org.sjf4j:sjf4j:${version.value}")`)

onMounted(async () => {
  try {
    const url = 'https://search.maven.org/solrsearch/select?q=g:%22org.sjf4j%22+AND+a:%22sjf4j%22&rows=1&wt=json'
    const response = await fetch(url)
    if (!response.ok) {
      return
    }
    const data = await response.json() as {
      response?: { docs?: Array<{ latestVersion?: string }> }
    }
    const latest = data.response?.docs?.[0]?.latestVersion
    if (latest) {
      version.value = latest
    }
  } catch {
    // Keep fallback version when network is unavailable.
  }
})
</script>

<template>
  <div class="language-groovy vp-adaptive-theme">
    <button title="Copy Code" class="copy"></button>
    <span class="lang">groovy</span>
    <pre><code><span class="line"><span style="color:#6A737D;">// Gradle</span></span>
<span class="line">{{ installLine }}</span></code></pre>
  </div>
</template>
