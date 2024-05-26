import styles from './CardManager.module.css'
import { TableRow } from './TableRow'
import { Button } from '../../components/Button'
import { TextInput } from '../../components/TextInput'
import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../../store/Context'
import { v4 as createId } from 'uuid'

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
      dispatch({ type: 'add-card', card: newCard })
      setBack('')
      setFront('')
    }
  }

  // TODO: Move these functions to arrow functions 
  const handleDeleteCard = (cardId: string) => {
    dispatch({ type: 'delete-card', cardId })
  }

  const handleEditCard = (cardId: string) => {
    navigate(`/edit/${cardId}`)
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
          cards.map(card => (
            <TableRow
              key={card.id}
              item={card}
              handleDeleteButtonClick={handleDeleteCard}
              handleEditButtonClick={handleEditCard}
            />
          ))
        )}
      </div>
    </>
  )
}
