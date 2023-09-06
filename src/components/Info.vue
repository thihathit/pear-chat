<script setup lang="ts">
import { computed, inject, toValue } from 'vue'

import { joinRoomContext } from '../contexts'

const { others } = inject(joinRoomContext)!

const count = computed(() => toValue(others).length + 1)

const text = computed(() => (toValue(count) > 1 ? 'people' : 'person'))
</script>

<template>
  <header class="w-100">
    <nav class="blur-bg low-blur">
      <h2 class="max-w">
        <span>{{ count.toLocaleString() }}</span> {{ text }} <span>online</span>
      </h2>
    </nav>
  </header>
</template>

<style scoped lang="scss">
header {
  align-self: flex-start;

  position: sticky;
  top: 0;

  --bxShadowDistance: 20px;
  padding-bottom: var(--bxShadowDistance);
}

nav {
  padding-top: 30px;
  padding-bottom: 30px;

  box-shadow: 0 var(--bxShadowDistance) 30px oklch(var(--bgLightness) 0 0 / 0.3);
}

h2 {
  font-size: 0.657em;
  text-align: center;

  --alpha: 0.25;
  --ch: 0.281 282.71;
  color: oklch(var(--lightness) 0 0 / var(--alpha));

  & span {
    --alpha: 0.8;

    color: oklch(60% var(--ch) / var(--alpha));

    @media (prefers-color-scheme: light) {
      color: oklch(46.76% var(--ch) / var(--alpha));
    }
  }
}
</style>
