import { useContext } from 'react'
import { Button } from '../../components/Button'
import styles from './ResultPage.module.css'
import { actionCreator } from '../../store/actions/ActionCreator'
import { AppContext } from '../../store/Context'
import { Game } from '../../models/Game'
import { useNavigate } from 'react-router-dom'
import { Card } from '../../models/Card'

export const ResultPage = () => {
  const { game } = useContext(AppContext)
  const navigate = useNavigate()

  const getCorrectAnswerCount = (game: Game) => {
    if (!game.answers) return

    let correctAnswerCount = 0
    for (let i = 0; i < game.answers.length; i++) {
      if (
        game.gameCards[i].back.toLowerCase() === game.answers[i].toLowerCase()
      ) {
        correctAnswerCount++
      }
    }
    return correctAnswerCount
  }

  const startNewGame =  async () => {
    await actionCreator({ type: 'delete-game' })
    navigate('/')
    actionCreator({ type: 'create-new-game' })
    
  }

  return (
    <>
      <div className={styles.noGameWrapper}>
        <Button
          title="Start New Game"
          clickHandler={() => startNewGame()}
        ></Button>
      </div>
      <div className={styles.solvedMessage}>
        Solved {getCorrectAnswerCount(game)} out of {game.gameCards.length}{' '}
        correctly.
      </div>
      <div className={styles.cardContainer}>
        <div className={styles.headerRow}>
          <div className={styles.headerCell}>Front</div>
          <div className={styles.headerCell}>Back</div>
          <div className={styles.headerCell}>Your Answer</div>
          <div className={styles.headerCell + " " + styles.hidden}>Accepted</div>
        </div>
        {game.gameCards.map((card: Card, index: number) => (
          <div key={card.front} className={styles.resultRow}>
            <div className={styles.resultCell}>{card.front}</div>
            <div className={styles.resultCell}>{card.back}</div>
            <div className={styles.resultCell + " " + (game.answers[index]?.toLowerCase() == card.back.toLowerCase() ? styles.right : styles.wrong)}>
              {game.answers[index] ? game.answers[index] : "No Answer given"}
            </div>
            <div className={styles.resultCell  + " " + styles.hidden}>
              {game.answers[index]?.toLowerCase() == card.back.toLowerCase() ? (
                <>&#x2713;</>
              ) : (
                <>&#x2717;</>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
