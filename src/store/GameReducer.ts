import { GameAction } from '../models/GameAction'
import { ApiState } from '../models/ApiState'

export function GameReducer(state: ApiState, action: GameAction): ApiState {
  switch (action.type) {
    case 'load-game':
      fetch('http://localhost:8000/game/load', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      }).then((resp: any) => {
        console.log('loaded game')
        return resp.json();
      }).then(game => {
        return {
          ...state,
          game: game
        }
      });

    case 'new-game':
      // fetch('http://localhost:8000/game/new', {
      //   method: 'GET',
      //   headers: { 'Content-Type': 'application/json' },
      // }).then((resp: any) => {
      //   console.log('new game created')
      //   return resp.json();
      // }).then(game => {
        state = {
          ...state,
          game: action.payload,
          x: 200
        }
        console.log(JSON.stringify(state));
        return state;
      // });
    // case 'submit-answer':
    //   fetch('http://localhost:8000/game/submit-answer' + action.cardId, {
    //     method: 'DELETE',
    //   }).then(() => {
    //     console.log(`card ${action.cardId} deleted`)
    //   })

    //   return {
    //     ...state,
    //     cards: state.cards.filter(card => card.id !== action.cardId),
    //   }
    // case 'delete-game':
    //   fetch('http://localhost:8000/game/delete' + action.card.id, {
    //     method: 'PUT',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(action.card),
    //   }).then(() => {
    //     console.log(`card ${action.card.id} updated`)
    //   })


    // return {
    //   ...state,
    //   cards: state.cards.map(card => {
    //     if (card.id == action.card.id) {
    //       return action.card
    //     } else {
    //       return card
    //     }
    //   }),
    // }
    // return state;
  }
  return state;
}

// export const initialApiState: ApiState = {
//   cards: [],
//   game: {}
// }
