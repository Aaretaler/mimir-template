import { Action } from '../models/Action'
import { ApiState } from '../models/ApiState'
import { createContext, ReactNode, useReducer } from 'react'
import { CardReducer, initialApiState } from './CardReducer'

interface AppState extends ApiState {
  dispatch: (action: Action) => void
}

const initialState: AppState = {
  ...initialApiState,
  dispatch: (action: Action) => {}
}

export const AppContext = createContext<AppState>(initialState)

interface Props {
  children: ReactNode
}

export const AppProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(CardReducer, initialState)

  const store = {
    ...state,
    dispatch
  }

  console.log('render AppProvider', state.cards)

  return <AppContext.Provider value={store}>{children}</AppContext.Provider>
}
