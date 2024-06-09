import { Card } from './Card';
import { Game } from './Game';


export interface AppState {
  cards: Card[],
  game: Game
}
