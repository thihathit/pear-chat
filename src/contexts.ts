import { InjectionKey } from 'vue'
import { JoinRoomReturn } from './hooks/joinRoom'

export const joinRoomContext = Symbol() as InjectionKey<JoinRoomReturn>
