import styles from './cardEditor.module.css'
import { TextInput } from '../../components/TextInput'
import { Button } from '../../components/Button'
import { useContext, useState } from 'react'
import { AppContext } from '../../store/Context'
import { useNavigate, useParams } from 'react-router-dom'
import { actionCreator } from '../../store/actions/ActionCreator'

export const CardEditor = () => {
  const navigate = useNavigate()
  const { cards } = useContext(AppContext)
  const { id } = useParams<{ id: string }>()
  const card = cards.find(card => card.id === id)
  const [back, setBack] = useState(card ? card.back : '')
  const [front, setFront] = useState(card ? card.front : '')

  const handleEditClick = () => {
    if (!card) return

    card.front = front
    card.back = back
    actionCreator({ type: 'update-card', payload: card })
    navigate('/cards')
  }

  return (
    <div className={styles.cardEditor}>
      <div className={styles.HeaderFront}>Front</div>
      <div className={styles.HeaderBack}>Back</div>
      <div className={styles.TextInputFront}>
        {card && (
          <TextInput
            placeholder={card.front}
            value={front}
            onChange={setFront}
          />
        )}
      </div>
      <div className={styles.TextInputBack}>
        {card && (
          <TextInput placeholder={card.back} value={back} onChange={setBack} />
        )}
      </div>
      <div className={styles.ButtonUpdate}>
        {card && <Button title="Update" clickHandler={handleEditClick} />}
      </div>
      {!card && <div className={styles.TableHeader}>Invalid Card Number</div>}
    </div>
  )
}
