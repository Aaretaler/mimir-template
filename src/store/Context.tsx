import { Action } from '../models/Action'
import { ApiState } from '../models/ApiState'
import { createContext, ReactNode, useReducer, useEffect } from 'react'
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
  const url = "http://localhost:8000/cards"
  // const [state, dispatch] = useFetch(CardReducer, initialState, url)
  
  useEffect(() => {
    const abortController = new AbortController()

    fetch(url, {  signal: abortController.signal })
    .then(response => {
        if(!response.ok) {
            throw Error('failed to fetch data for that resource')
        }
        return response.json()
    })
    .then(data => {
        dispatch({type: 'set-cards', cards:data})
    })
    .catch(err => {
        if(err.name === 'AbortError'){
            console.log('fetch aborted')
            // setError(err.message)
        }
        // setLoading(false)
        // setError(err.message);
    })

    return () => abortController.abort()
}, [url])

  const store = {
    ...state,
    dispatch
  }

  console.log('render AppProvider', state.cards)

  return <AppContext.Provider value={store}>{children}</AppContext.Provider>
}
