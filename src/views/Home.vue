<script setup lang="ts">
import { provide } from 'vue'

import Chat from '../components/Chat.vue'

import joinRoom from '../hooks/joinRoom'

import { joinRoomContext } from '../contexts'

provide(joinRoomContext, joinRoom())
</script>

<template>
  <section :class="styles.container">
    <Chat />
  </section>
</template>

<style module="styles">
.container {
  width: 100%;
  min-height: 100%;

  display: grid;
  grid-template-columns: 100%;
}
</style>
