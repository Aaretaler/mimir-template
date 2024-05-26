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
      // TODO: URL extrahieren?

      fetch('http://localhost:8000/cards', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(action.card),
      }).then(() => {
        console.log('new card added')
      })

      return {
        ...state,
        cards: [...state.cards, action.card],
      }
    case 'delete-card':
      fetch('http://localhost:8000/cards/' + action.cardId, {
        method: 'DELETE',
      }).then(() => {
        console.log(`card ${action.cardId} deleted`)
      })

      return {
        ...state,
        cards: state.cards.filter(card => card.id !== action.cardId),
      }
    case 'update-card':
      fetch('http://localhost:8000/cards/' + action.card.id, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(action.card),
      }).then(() => {
        console.log(`card ${action.card.id} updated`)
      })

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
