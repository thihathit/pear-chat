<script setup lang="ts">
import { isRegisterComplete, user } from './states/user'

import Register from './components/Register.vue'

import Home from './views/Home.vue'

const doRegister = () => {
  user.value.isRegistered = true
}
</script>

<template>
  <TransitionGroup appear name="fade">
    <Home v-show="isRegisterComplete" key="home" />
    <Register
      v-show="!isRegisterComplete"
      key="register"
      @submit="doRegister"
    />
  </TransitionGroup>
</template>
