import { Game } from "../../models/Game"

type CreateNewGame = {
  type: 'create-new-game'
}

type NewGameAction = {
  type: 'new-game',
  payload: Game
}

type LoadGameAction = {
  type: 'load-game',
  payload: Game
}

type SubmitAnswerAction = {
  type: 'submit-answer'
  payload: string
}

type DeleteGamedAction = {
  type: 'delete-game'
}


export type GameAction = NewGameAction | SubmitAnswerAction | DeleteGamedAction | LoadGameAction | CreateNewGame
