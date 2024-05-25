import { useState } from 'react'
import { Button } from '../../components/Button'
import { TextInput } from '../../components/TextInput'
import styles from './GamePage.module.css'

export const GamePage = () => {
  let [back, setBack] = useState('')
  let [front, setFront] = useState('')

  const handleEditClick = () => {
    // Hier kannst du die Logik einfügen, die beim Klick auf den Button ausgeführt werden soll.
    console.log('Edit button clicked!')
  }

  return (
    <>
      <div className={styles.gameState}>
        <div className={styles.themedText}>Progress</div>
        <Button title="Delete" clickHandler={() => null}></Button>
      </div>

      <div className={styles.cardContainer}>
        <div className={`${styles.card} ${styles.themedText}`}>Card</div>
        <div className={styles.answerContainer}>
          <TextInput placeholder="Placeholder" value={back} onChange={setBack} />
          <Button title="Submit" clickHandler={handleEditClick} />
        </div>
      </div>
    </>
  )
}
