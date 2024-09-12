import { Card } from './Card';
import { Game } from './Game';
import { User } from './User';


export interface AppState {
  user: User | null,
  cards: Card[],
  game: Game
}
