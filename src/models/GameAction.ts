
type NewGameAction = {
  type: 'new-game',
  payload: any
}

type LoadGameAction = {
  type: 'load-game',
  payload: any
}

type SubmitAnswerAction = {
    type: 'submit-anwser'
    answer: string
  }

  type DeleteGamedAction = {
    type: 'delete-game'
  }


export type GameAction = NewGameAction | SubmitAnswerAction | DeleteGamedAction  | LoadGameAction
