<script setup lang="ts">
import { parseISO } from 'date-fns'
import { computed, toValue } from 'vue'
import { user as currentUser } from '../states/user'

import { BroadcastPayload } from '../services/liveblocks'

export type Message = BroadcastPayload['SEND']

export type Props = {
  messages: Message[]
}

const props = defineProps<Props>()

const formattedMessages = computed(() =>
  props.messages
    .map(({ user, time, ...rest }) => ({
      ...rest,
      user,
      time,
      me: user.id === toValue(currentUser).id,
      date: parseISO(time)
    }))
    .map(({ date, ...rest }) => ({
      ...rest,
      timestamp: date.getTime()
    }))
    .sort((a, b) => a.timestamp - b.timestamp)
)
</script>

<template>
  <section class="max-w w-100 container">
    <article
      :key="`${id}-${user.id}-${time}`"
      :class="{ me }"
      v-for="{ id, content: { text }, me, user, time } in formattedMessages"
    >
      <header>{{ user.name }}</header>
      <main>{{ text }}</main>
    </article>
  </section>
</template>

<style scoped lang="scss">
.container {
  --gap: 28px;

  align-self: flex-end;

  padding-top: var(--gap);
  padding-bottom: var(--gap);

  display: flex;
  flex-direction: column;
  gap: var(--gap);
}

article {
  display: grid;
  grid-template-columns: 100%;
  gap: 8px;
  justify-items: start;

  & header {
    font-size: 0.756em;
  }

  & main {
    --bgAlpha: 0.04;

    max-width: 100%;

    padding: 8px 14px;

    background-color: oklch(var(--lightness) 0 0 / var(--bgAlpha));

    border-radius: 10px;
  }

  &.me {
    justify-items: end;

    & main {
      --bgAlpha: 0.1;
    }
  }
}
</style>
