import { createContext, ReactNode, useReducer, useEffect } from 'react'
import { AppState } from '../models/AppState'
import { AppReducer } from './AppReducer'
import { AppAction } from './actions/AppAction'

interface IAppState extends AppState {
  dispatch: (action: AppAction) => void
}

const initialState: IAppState = {
  cards: [],
  game: { gameCards: [], cardIndex: 0, answers: [] },
  dispatch: (action: AppAction) => { }
}

export const AppContext = createContext<IAppState>(initialState)
export let AppStore: IAppState;

interface Props {
  children: ReactNode
}

export const AppProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(AppReducer, initialState)
  const url = "http://localhost:8000/state"

  useEffect(() => {
    const abortController = new AbortController()
    fetch(url, { signal: abortController.signal })
      .then(response => {
        if (!response.ok) {
          throw Error('failed to fetch data for that resource')
        }
        return response.json()
      })
      .then(data => {
        dispatch({ type: 'set-cards', payload: data.cards });
        dispatch({ type: 'load-game', payload: data.game });
      })
      .catch(err => {
        if (err.name === 'AbortError') {
          console.log('fetch aborted');
        }
      });

    return () => abortController.abort()
  }, [url])

  AppStore = {
    ...state,
    dispatch
  }

  return <AppContext.Provider value={AppStore}>{children}</AppContext.Provider>
}
