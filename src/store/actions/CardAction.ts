import { Card } from '../../models/Card'

type SetCardsAction = {
  type: 'set-cards'
  payload: Card[]
}

type AddCardAction = {
  type: 'add-card'
  payload: Card
}

type DeleteCardAction = {
  type: 'delete-card'
  payload: Card
}

type UpdateCardAction = {
  type: 'update-card'
  payload: Card
}


export type CardAction = SetCardsAction | AddCardAction | DeleteCardAction | UpdateCardAction
