import { describe, it, expect } from 'vitest';

import { AppState } from '../models/AppState';
import { Card } from '../models/Card';
import { Game } from '../models/Game';
import { User } from '../models/User';
import { AppAction } from '../store/actions/AppAction.ts'
import { AppReducer } from '../store/AppReducer.ts'

describe('AppReducer', () => {
  // Beispiel-Initialzustand
  const initialState: AppState = {
    user: null,
    cards: [],
    game: { cardIndex: 0, gameCards: [], answers: [] } as Game,
  };

  it('should handle receive-login action', () => {
    const user: User = {
      username: 'johndoe',
      roles: ['admin'],
      accessToken: 'some-access-token',
    };
    const action: AppAction = { type: 'receive-login', payload: user };
    const newState = AppReducer(initialState, action);

    expect(newState.user).toEqual(user);
  });

  it('should handle logout action', () => {
    const loggedInUser: User = {
      username: 'johndoe',
      roles: ['admin'],
      accessToken: 'some-access-token',
    };
    const action: AppAction = { type: 'logout' };
    const newState = AppReducer({ ...initialState, user: loggedInUser }, action);

    expect(newState.user).toBeNull();
  });

  it('should handle set-cards action', () => {
    const cards: Card[] = [
      { id: '1', front: 'Front 1', back: 'Back 1' },
      { id: '2', front: 'Front 2', back: 'Back 2' },
    ];
    const action: AppAction = { type: 'set-cards', payload: cards };
    const newState = AppReducer(initialState, action);

    expect(newState.cards).toEqual(cards);
  });

  it('should handle add-card action', () => {
    const card: Card = { id: '3', front: 'Front 3', back: 'Back 3' };
    const action: AppAction = { type: 'add-card', payload: card };
    const newState = AppReducer({ ...initialState, cards: [{ id: '1', front: 'Front 1', back: 'Back 1' }] }, action);

    expect(newState.cards).toEqual([{ id: '1', front: 'Front 1', back: 'Back 1' }, card]);
  });

  it('should handle delete-card action', () => {
    const action: AppAction = { type: 'delete-card', payload: { id: '1' } };
    const stateWithCards = {
      ...initialState,
      cards: [
        { id: '1', front: 'Front 1', back: 'Back 1' },
        { id: '2', front: 'Front 2', back: 'Back 2' }
      ]
    };
    const newState = AppReducer(stateWithCards, action);

    expect(newState.cards).toEqual([{ id: '2', front: 'Front 2', back: 'Back 2' }]);
  });

  it('should handle load-game action', () => {
    const game: Game = {
      cardIndex: 1,
      gameCards: [{ id: '1', front: 'Front 1', back: 'Back 1' }],
      answers: []
    };
    const action: AppAction = { type: 'load-game', payload: game };
    const newState = AppReducer(initialState, action);

    expect(newState.game).toEqual(game);
  });

  it('should handle new-game action', () => {
    const newGame: Game = {
      cardIndex: 0,
      gameCards: [{ id: '1', front: 'New Game Front', back: 'New Game Back' }],
      answers: []
    };
    const action: AppAction = { type: 'new-game', payload: newGame };
    const newState = AppReducer(initialState, action);

    expect(newState.game).toEqual(newGame);
  });

  it('should handle delete-game action', () => {
    const action: AppAction = { type: 'delete-game' };
    const stateWithGame = {
      ...initialState,
      game: { cardIndex: 5, gameCards: [{ id: '1', front: 'Front 1', back: 'Back 1' }], answers: ['Answer 1'] },
    };
    const newState = AppReducer(stateWithGame, action);

    expect(newState.game).toEqual({ cardIndex: 0, gameCards: [], answers: [] });
  });

  it('should handle submit-answer action', () => {
    const answers = ['Answer 1', 'Answer 2'];
    const action: AppAction = { type: 'submit-answer', payload: answers };
    const stateWithGame = {
      ...initialState,
      game: { cardIndex: 0, gameCards: [{ id: '1', front: 'Front 1', back: 'Back 1' }], answers: [] },
    };
    const newState = AppReducer(stateWithGame, action);

    expect(newState.game.cardIndex).toBe(1);
    expect(newState.game.answers).toEqual(answers);
  });
});
