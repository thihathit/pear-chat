import { onUnmounted, shallowRef, toValue, watch } from 'vue'

import { user } from '../states/user'

import {
  client,
  EventNames,
  BroadcastPayload,
  Rooms
} from '../services/liveblocks'

type Options = {
  roomId?: Rooms
}
export const joinRoom = (options?: Options) => {
  const { roomId = 'global' } = { ...options }

  const room = client.enter(roomId, {
    initialPresence: {
      name: toValue(user).name
    }
  })

  const presence = shallowRef(room.getPresence())
  const currentUser = shallowRef(room.getSelf())
  const others = shallowRef(room.getOthers())

  const refreshCurrentUser = () => {
    currentUser.value = room.getSelf()
  }

  const subscriptions = [
    room.subscribe('status', status => {
      if (status !== 'connected') return

      refreshCurrentUser()
    }),

    room.subscribe('my-presence', newPresence => {
      presence.value = newPresence
    }),

    room.subscribe('others', updatedOthers => {
      others.value = updatedOthers
    })
  ]

  const listen = <N extends EventNames>(
    type: N,
    callback: (data: BroadcastPayload[N]) => void
  ) => {
    return room.subscribe('event', ({ event }) => {
      // @ts-expect-error
      switch (event.type) {
        case type: {
          callback(event)
          break
        }
      }
    })
  }

  const broadcast = <N extends EventNames>(
    type: N,
    value?: BroadcastPayload[N]
  ) => {
    // @ts-expect-error
    room.broadcastEvent({ type, ...value })
  }

  // Sync user name
  watch(user, ({ name }) => {
    room.updatePresence({ name })
  })

  watch(others, refreshCurrentUser)

  onUnmounted(() => subscriptions.forEach(stop => stop()))

  return { currentUser, others, room, broadcast, listen }
}

export type JoinRoomReturn = ReturnType<typeof joinRoom>

export default joinRoom
