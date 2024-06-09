import styles from './CardManager.module.css'
import { TableRow } from './TableRow'
import { Button } from '../../components/Button'
import { TextInput } from '../../components/TextInput'
import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../../store/Context'
import { v4 as createId } from 'uuid'
import { Card } from '../../models/Card'
import { actionCreator } from '../../store/actions/ActionCreator'

export const CardManager = () => {
  const [back, setBack] = useState('')
  const [front, setFront] = useState('')

  const navigate = useNavigate()
  const { cards, dispatch } = useContext(AppContext)

  const handleSaveButtonClick = () => {
    if (front === '' || back === '') {
      alert('Please fill in all fields')
    } else {
      const newCard = { id: createId(), front, back }
      actionCreator({ type: 'add-card', payload: newCard });
      setBack('')
      setFront('')
    }
  }


  return (
    <>
      <div className={styles.cardManager}>
        <TextInput placeholder="Front" value={front} onChange={setFront} />
        <TextInput placeholder="Back" value={back} onChange={setBack} />
        <Button title="Save" clickHandler={handleSaveButtonClick} />

        {cards.length === 0 ? (
          <div className={styles.noData}>No Data</div>
        ) : (
          cards.map((card: Card) => (
            <TableRow
              key={card.id}
              item={card}
              handleDeleteButtonClick={(cardId: string) => { actionCreator({ type: 'delete-card', payload: card }) }}
              handleEditButtonClick={(cardId: string) => { navigate(`/edit/${cardId}`) }}
            />
          ))
        )}
      </div>
    </>
  )
}
