import { useContext, useEffect, useState } from 'react'
import { Button } from '../../components/Button'
import { TextInput } from '../../components/TextInput'
import styles from './GamePage.module.css'
import { actionCreator } from '../../store/actions/ActionCreator'
import { AppContext } from '../../store/Context'
import { Game } from '../../models/Game'
import { useNavigate } from 'react-router-dom'

export const GamePage = () => {
  const { game } = useContext(AppContext)
  const navigate = useNavigate()

  let [answer, setAnswer] = useState('')

  const handleAnswerSubmission = () => {
    actionCreator({ type: 'submit-answer', payload: answer })
    checkGameStatus()
    setAnswer('')
  }

  const checkGameStatus = () => {
    if (game.answers.length > 0 && (game.answers.length >= game.gameCards.length)) {
      actionCreator({ type: 'get-result' })
      console.log('navigating result')
      navigate('/result')
    }
  }
  const getPercent = (game: Game) => {
    if (!game) return 0

    const percent = (game.cardIndex / game.gameCards.length) * 100
    return Math.trunc(percent)
  }

  useEffect(() => {
    checkGameStatus()
  }, [game.answers.length])

  return (
    <>
      {game && game.gameCards.length === 0 ? (
        <>
          <div className={styles.noGameWrapper}>
            <Button
              title="Start New Game"
              clickHandler={() => {
                actionCreator({ type: 'create-new-game' })
              }}
            ></Button>
            <div className={styles.noGameMessage}>No game running.</div>
          </div>
        </>
      ) : (
        <>
          <div className={styles.gameState}>
            <div className={styles.themedText}>
              Progress {getPercent(game)}%
            </div>
            <Button
              title="Delete Game"
              clickHandler={() => actionCreator({ type: 'delete-game' })}
            ></Button>
          </div>
          <div className={styles.cardContainer}>
            <div className={`${styles.card} ${styles.themedText}`}>
              {(game.gameCards[game.cardIndex] || {}).front}
            </div>
            <div className={styles.answerContainer}>
              <TextInput
                placeholder="Answer"
                value={answer}
                onChange={setAnswer}
              />
              <Button title="Submit" clickHandler={handleAnswerSubmission} />
            </div>
          </div>
        </>
      )}
    </>
  )
}
