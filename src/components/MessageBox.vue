<script setup lang="ts">
import { useMagicKeys } from '@vueuse/core'
import { ref, toValue, watch } from 'vue'

const formRef = ref<HTMLFormElement>()
const inputRef = ref<HTMLInputElement>()
const inputModel = ref<string>('')

const keys = useMagicKeys()

const emit = defineEmits<{
  submit: [text: string, reset: typeof reset]
}>()

const reset = () => {
  const form = toValue(formRef)

  form?.reset()
  focus()
}

const onSubmit = () => {
  const form = toValue(formRef)
  const input = toValue(inputRef)

  if (!form?.checkValidity()) return

  input?.blur()

  const value = toValue(inputModel)

  emit('submit', value, reset)
}

const focus = () => {
  const input = toValue(inputRef)

  input?.focus()
}

watch(keys.current, () => focus())
</script>

<template>
  <footer class="w-100" @click="focus">
    <article class="blur-bg low-blur">
      <form class="max-w" ref="formRef" @submit.prevent="onSubmit">
        <input
          required
          autofocus
          type="text"
          ref="inputRef"
          placeholder="Write a message..."
          v-model="inputModel"
        />
      </form>
    </article>
  </footer>
</template>

<style scoped lang="scss">
footer {
  align-self: flex-end;

  position: sticky;
  bottom: 0;

  --bxShadowDistance: 20px;

  padding-top: var(--bxShadowDistance);
}

input {
  outline: none;

  --bxShadowAlpha: 0.03;

  display: block;
  width: 100%;
  border: 0;
  background-color: oklch(var(--lightness) 0 0 / 0.0095);
  box-shadow: 0 0 0 2px oklch(var(--lightness) 0 0 / var(--bxShadowAlpha));
  backdrop-filter: blur(20px);
  border-radius: 3px;
  padding: 10px 20px;

  font-size: 0.93em;

  transition: 0.3s box-shadow;

  &:hover {
    --bxShadowAlpha: 0.065;
  }
  &:focus {
    --bxShadowAlpha: 0.09;
  }
}

article {
  padding-top: 30px;
  padding-bottom: 50px;

  box-shadow: 0 calc(var(--bxShadowDistance) * -1) 30px
    oklch(var(--bgLightness) 0 0 / 0.3);
}
</style>
