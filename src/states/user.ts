import { computed, toValue } from 'vue'
import { useStorage } from '@vueuse/core'

import { TypeID } from '../types'
import { getID } from '../functions'

export type User = {
  id: TypeID
  name: string | undefined
}

type State = {
  isRegistered: boolean
}

export const user = useStorage<User & State>('user', {
  id: getID(),
  name: undefined,
  isRegistered: false
})

export const hasName = computed(() => !!toValue(user).name)

export const isRegisterComplete = computed(
  () => toValue(hasName) && toValue(user).isRegistered
)
