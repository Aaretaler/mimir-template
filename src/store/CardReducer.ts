import { Action } from '../models/Action'
import { ApiState } from '../models/ApiState'

export function CardReducer(state: ApiState, action: Action): ApiState {
  switch (action.type) {
    case 'set-cards':
      return {
        ...state,
        cards: action.cards,
      }
    case 'add-card':
      let updatedCards = state.cards
      updatedCards.push(action.card)
      return {
        ...state,
        cards: updatedCards,
      }
    case 'delete-card':
      return {
        ...state,
        cards: state.cards.filter(card => card.id !== action.cardId),
      }
    case 'update-card':
      return {
        ...state,
        cards: state.cards.map(card => {
          if (card.id == action.card.id) {
            return action.card
          } else {
            return card
          }
        }),
      }
  }
}

export const initialApiState: ApiState = {
  cards: [],
}
