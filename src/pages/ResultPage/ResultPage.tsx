import { useContext, useEffect, useState } from 'react'
import { Button } from '../../components/Button'
import styles from './ResultPage.module.css'
import { actionCreator } from '../../store/actions/ActionCreator'
import { AppContext } from '../../store/Context'
import { Game } from '../../models/Game'
import { useNavigate } from 'react-router-dom'
import { Card } from '../../models/Card'

export const ResultPage = () => {
  const { cards, game, dispatch } = useContext(AppContext);
  const navigate = useNavigate();

  const getCorrectAnswerCount = (game: Game) => {
    if (!game.answers) return;

    let correctAnswerCount = 0;
    for (let i = 0; i < game.answers.length; i++) {
      if (game.gameCards[i].back === game.answers[i]) {
        correctAnswerCount++;
      }
    }
    return correctAnswerCount;
  }

  const startNewGame = () => {
    actionCreator({ type: 'delete-game' });
    navigate('/');
    actionCreator({ type: 'create-new-game' });
  }

  return (
    <>
      {
        <>
          <div className={styles.noGameWrapper}>
            <Button title="Start New Game" clickHandler={() => startNewGame()}></Button>
          </div>
          <div className={styles.solvedMessage}>Solved {getCorrectAnswerCount(game)} out of {game.gameCards.length}</div>
          <div className={styles.cardContainer}>
            <div className={styles.headerRow}>
              <div className={styles.headerCell}>Front</div>
              <div className={styles.headerCell}>Back</div>
              <div className={styles.headerCell}>Your Answer</div>
              <div className={styles.headerCell}>Accepted</div>
            </div>
            {game.gameCards.map((card: Card, index: number) => (
              <div key={card.front} className={styles.resultRow}>
                <div className={styles.resultCell}>{card.front}</div>
                <div className={styles.resultCell}>{card.back}</div>
                <div className={styles.resultCell}>{game.answers[index]}</div>
                <div className={styles.resultCell}>{game.answers[index] == card.back ? <>&#x2713;</> : 'X'}</div>
              </div>
            ))}
          </div>
        </>
      }
    </>
  )
}
