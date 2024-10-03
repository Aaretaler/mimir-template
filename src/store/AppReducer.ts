import { AppAction } from './actions/AppAction'
import { AppState } from '../models/AppState'
import { getUserFromLocalStorage, saveUserToLocalStorage } from '../models/User'
import { initialState } from './Context'

export function AppReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'set-loading':
      return {
        ...state,
        isLoading: action.payload
      }
    case 'load-state':
      return {
        ...action.payload,
        isLoading: false,
        user: state.user
      }
    // User actions
    case 'receive-login':
      const loginFailed = action.payload === undefined ? true : false
      saveUserToLocalStorage(action.payload === undefined ? null : action.payload) 
      return {
        ...state,
        user: action.payload,
        loginFailed : loginFailed
      }
    case 'load-user':
      return {
        ...state,
        user: getUserFromLocalStorage()
      }
    case 'logout':
      localStorage.removeItem('user');
      return {
        ...initialState,
        isLoading: false
      }
    // Card actions
    case 'set-cards':
      return {
        ...state,
        cards: action.payload,
      }
    case 'add-card':
      return {
        ...state,
        cards: [...state.cards, action.payload],
      }
    case 'delete-card':
      return {
        ...state,
        cards: state.cards.filter(card => card.id !== action.payload.id),
      }
    // game actions
    case 'new-game':
    case 'load-game':
      return {
        ...state,
        game: action.payload,
      }
    case 'delete-game':
      return {
        ...state,
        game: { cardIndex: 0, gameCards: [], answers: [] },
      }
    case 'submit-answer':
      return {
        ...state,
        game: {
          ...state.game,
          cardIndex: state.game.cardIndex + 1,
          answers: [...action.payload],
        },
      }
  }
  return state
}
