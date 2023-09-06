<script setup lang="ts">
import { inject, onUnmounted, ref, toValue, watchEffect } from 'vue'
import { formatISO } from 'date-fns'

import { getID } from '../functions'

import History, {
  Props as HistoryProps,
  Message
} from '../components/History.vue'
import MessageBox from '../components/MessageBox.vue'

import { user } from '../states/user'

import { joinRoomContext } from '../contexts'

const { broadcast, listen, room } = inject(joinRoomContext)!

const anchorRef = ref<HTMLSpanElement>()

const messages = ref<HistoryProps['messages']>([])

const onSubmit = (text: string, reset: VoidFunction) => {
  const data: Message = {
    id: getID(),
    content: { text },
    time: formatISO(new Date()),
    user: toValue(user)
  }

  broadcast('SEND', data)

  messages.value.push(data)

  reset()
}

const snapToAnchor = () => {
  const anchor = toValue(anchorRef)

  if (!anchor) return

  anchor.scrollIntoView()

  setTimeout(() => {
    anchor.scrollIntoView()
  }, 100)
}

const listeners = [
  listen('SEND', message => {
    messages.value.push(message)
  }),

  listen('SHARE_HISTORY', data => {
    data.messages.forEach(message => {
      messages.value.push(message)
    })
  }),

  listen('REQUEST_HISTORY', () => {
    const messagesData = toValue(messages)

    if (!messagesData.length) return

    broadcast('SHARE_HISTORY', { messages: messagesData })
  }),

  room.subscribe('status', () => {
    broadcast('REQUEST_HISTORY')
  })
]

onUnmounted(() => listeners.forEach(stop => stop()))

watchEffect(() => {
  snapToAnchor()

  const messagesValue = toValue(messages)
  const removeDuplicates = [...new Set(messagesValue)]

  if (removeDuplicates.length == messagesValue.length) return

  messages.value = removeDuplicates
})
</script>

<template>
  <History :messages="messages" />

  <MessageBox @submit="onSubmit" />

  <span ref="anchorRef" class="styles.anchor" />
</template>

<style module="styles">
.anchor {
  visibility: hidden;
  pointer-events: none;
}
</style>
