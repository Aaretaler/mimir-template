import { AppAction } from './actions/AppAction'
import { AppState } from '../models/AppState'

export function AppReducer(state: AppState, action: AppAction): AppState {
    switch (action.type) {
        case 'set-cards':
            return {
                cards: action.payload,
                game: state.game
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
        case 'load-game':
            return {
                ...state,
                game: action.payload
            };
        case 'new-game':
            return {
                ...state,
                game: action.payload
            };
        case 'delete-game':
            return {
                ...state,
                game: { cardIndex: 0, gameCards: [], answers: [] }
            };
        case 'submit-answer':
            return {
                ...state,
                game: {
                    ...state.game,
                    cardIndex: state.game.cardIndex + 1,
                    answers: [...action.payload]
                }
            };

    }
    return state;
}
