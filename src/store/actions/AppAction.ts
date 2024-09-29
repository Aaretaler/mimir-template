import { AppState } from '../../models/AppState'
import { CardAction } from './CardAction'
import { GameAction } from './GameAction'
import { UserAction } from './UserAction'

type SetLoadingAction = {
  type: 'set-loading'
  payload: Boolean
}

type GetStateAction = {
  type: 'get-state'
}

type LoadStateAction = {
  type: 'load-state'
  payload: AppState
}

export type AppAction =
  | GameAction
  | CardAction
  | UserAction
  | SetLoadingAction
  | GetStateAction
  | LoadStateAction
