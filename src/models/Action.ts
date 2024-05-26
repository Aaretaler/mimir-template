import { Card } from '../models/Card'

type SetCardsAction = {
  type: 'set-cards'
  cards: Card[]
}

type AddCardAction = {
    type: 'add-card'
    card: Card
  }

  type DeleteCardAction = {
    type: 'delete-card'
    cardId: string
  }

  type UpdateCardAction = {
    type: 'update-card'
    card: Card
  }

export type Action = SetCardsAction | AddCardAction | DeleteCardAction | UpdateCardAction
