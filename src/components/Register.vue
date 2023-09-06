<script setup lang="ts">
import { useEventListener } from '@vueuse/core'
import { ref, toValue } from 'vue'
import { user } from '../states/user'

const formRef = ref<HTMLFormElement>()
const inputRef = ref<HTMLInputElement>()

const emit = defineEmits<{
  submit: [value: string]
}>()

const onSubmit = () => {
  const form = toValue(formRef)
  const input = toValue(inputRef)

  if (!form?.checkValidity()) return

  input?.blur()

  const value = toValue(user).name!

  emit('submit', value)
}

const autoFocus = () => {
  const input = toValue(inputRef)

  input?.focus()
}

useEventListener('focus', autoFocus)
useEventListener('click', autoFocus)
</script>

<template>
  <form ref="formRef" @submit.prevent="onSubmit">
    <input
      required
      autofocus
      type="text"
      ref="inputRef"
      placeholder="Enter your name"
      v-model="user.name"
    />
  </form>
</template>

<style scoped lang="scss">
form {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

input {
  outline: none;

  pointer-events: auto;
  padding: 10px;
  display: block;
  text-align: center;

  --bxShadowAlpha: 0.15;
  --bxShadow: oklch(var(--lightness) 0 0 / var(--bxShadowAlpha));

  border: 3px solid oklch(var(--bgLightness) 0 0);
  box-shadow: 0 0 0 3px var(--bxShadow);
  border-radius: 10px;

  background-color: oklch(var(--lightness) 0 0 / 0.05);

  transition: 0.3s box-shadow;

  &:focus {
    --bxShadowAlpha: 0.4;
  }
}
</style>
