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
  let [back, setBack] = useState(card ? card.back : '')
  let [front, setFront] = useState(card ? card.front : '')

  const handleEditClick = () => {
    if (!card) return

    card.front = front
    card.back = back
    actionCreator({ type: 'update-card', payload: card })
    navigate('/cards')
  }

  return (
    <div className={styles.cardEditor}>
      <div className={styles.TableHeader}>Front</div>
      <div className={styles.TableHeader}>Back</div>
      <div />
      {card && (
        <TextInput placeholder={card.front} value={front} onChange={setFront} />
      )}
      {card && (
        <TextInput placeholder={card.back} value={back} onChange={setBack} />
      )}
      {card && <Button title="Edit" clickHandler={handleEditClick} />}
      {!card && <div className={styles.TableHeader}>Invalid Card Number</div>}
    </div>
  )
}
