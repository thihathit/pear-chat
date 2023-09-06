import { createClient } from '@liveblocks/client'

import { User } from '../states/user'
import { TypeID } from '../types'

const ROOMS = ['global'] as const
export type Rooms = (typeof ROOMS)[number]

type Message = {
  user: User

  /** Message ID */
  id: TypeID

  /** Message Content */
  content: {
    text: string
  }

  /** UTC string */
  time: string
}

export type BroadcastPayload = {
  /** Send message */
  SEND: Message

  /** Use case: Re-sync History within peers */
  REQUEST_HISTORY: never

  /** Use case: Re-sync History within peers */
  SHARE_HISTORY: {
    messages: Message[]
  }
}
export type EventNames = keyof BroadcastPayload

export const client = createClient({
  publicApiKey: import.meta.env.VITE_LIVEBLOCKS_KEY
})
