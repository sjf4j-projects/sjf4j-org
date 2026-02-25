<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'

const version = ref('latest.release')

const installLine = computed(() => `implementation("org.sjf4j:sjf4j:${version.value}")`)

onMounted(async () => {
  try {
    const url = 'https://img.shields.io/maven-metadata/v.json?metadataUrl=https%3A%2F%2Frepo1.maven.org%2Fmaven2%2Forg%2Fsjf4j%2Fsjf4j%2Fmaven-metadata.xml&label=maven-central'
    const response = await fetch(url)
    if (!response.ok) {
      return
    }
    const data = await response.json() as { message?: string; value?: string }
    const raw = (data.message || data.value || '').trim()
    const resolvedVersion = raw.replace(/^v/i, '')
    if (resolvedVersion) {
      version.value = resolvedVersion
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
