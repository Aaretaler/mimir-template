import { useEffect, useReducer, useState } from 'react'
import { Button } from '../../components/Button'
import { TextInput } from '../../components/TextInput'
import styles from './GamePage.module.css'
import { GameReducer } from '../../store/GameReducer'
import { initialApiState } from '../../store/CardReducer'

export const GamePage = () => {
  let [back, setBack] = useState('')

  const handleEditClick = () => {
    // Hier kannst du die Logik einfügen, die beim Klick auf den Button ausgeführt werden soll.
    console.log('Edit button clicked!')
  }

  const [state, dispatch] = useReducer(GameReducer, initialApiState)
  useEffect(() => {
    dispatch({ type: 'load-game', payload: ''})
  }, [])

  const createNewGame = () => {
    fetch('http://localhost:8000/game/new', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      }).then((resp: any) => {
        console.log('new game created')
        return resp.json();
      }).then(game => {
        dispatch({type: 'new-game', payload: game})
      });
  }
  return (
    <>
      <div className={styles.gameState}>
        <div className={styles.themedText}>Progress</div>
        <Button title="Delete" clickHandler={() => null}></Button>
      </div>

    {JSON.stringify(state.x)}
      {Object.keys(state.game.gameCards||[]).length == 0 ? (
        <>
        <h1>No Game Running</h1>
        <Button title="Create New Game" clickHandler={() => createNewGame()}></Button>
        </>
      ) : (
        <div className={styles.cardContainer}>
          <div className={`${styles.card} ${styles.themedText}`}>Card</div>
          <div className={styles.answerContainer}>
            <TextInput
              placeholder="Placeholder"
              value={back}
              onChange={setBack}
            />
            <Button title="Submit" clickHandler={handleEditClick} />
          </div>
        </div>
      )}
    </>
  )
}
