import { createContext, ReactNode, useReducer } from 'react'
import { AppState } from '../models/AppState'
import { AppReducer } from './AppReducer'
import { AppAction } from './actions/AppAction'

interface IAppState extends AppState {
  dispatch: (action: AppAction) => void
}

const initialState: IAppState = {
  cards: [],
  game: { gameCards: [], cardIndex: 0, answers: [] },
  dispatch: (action: AppAction) => {},
}

export const AppContext = createContext<IAppState>(initialState)
export let AppStore: IAppState

interface Props {
  children: ReactNode
  initialData: AppState 
}

export const AppProvider = ({ children, initialData }: Props) => {
  const [state, dispatch] = useReducer(AppReducer, {
    ...initialState,
    ...initialData, 
  })

  AppStore = {
    ...state,
    dispatch,
  }

  return <AppContext.Provider value={AppStore}>{children}</AppContext.Provider>
}



