import styles from './CardManager.module.css'
import { TableRow } from './TableRow'
import { Button } from '../../components/Button'
import { TextInput } from '../../components/TextInput'
import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../../store/Context'
import { Card } from '../../models/Card'
import { actionCreator } from '../../store/actions/ActionCreator'

export const CardManager = () => {
  const [back, setBack] = useState('')
  const [front, setFront] = useState('')

  const navigate = useNavigate()
  const { cards } = useContext(AppContext)

  const handleSaveButtonClick = () => {
    if (front === '' || back === '') {
      alert('Please fill in all fields')
    } else {
      const newCard = { id: "", front, back }
      actionCreator({ type: 'add-card', payload: newCard })
      setBack('')
      setFront('')
    }
  }


  return (
    <>
      <div className={styles.cardManager}>
      <div className={styles.gridHeader}>
        <TextInput placeholder="Front" value={front} onChange={setFront} />
        <TextInput placeholder="Back" value={back} onChange={setBack} />
        <Button title="Save" clickHandler={handleSaveButtonClick} />
      </div>
        {cards.length === 0 ? (
          <div className={styles.noData}>No Data</div>
        ) : (
          cards.map((card: Card) => (
            <TableRow
              key={card.id}
              item={card}
              handleDeleteButtonClick={() => { actionCreator({ type: 'delete-card', payload: card }) }}
              handleEditButtonClick={(cardId: string) => { navigate(`/edit/${cardId}`) }}
            />
          ))
        )}
      </div>
    </>
  )
}
