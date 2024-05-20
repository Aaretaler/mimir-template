import styles from './CardManager.module.css'
import { TableRow } from './TableRow'
import { Button } from '../../components/Button'
import { TextInput } from '../../components/TextInput'
import { Card } from '../../models/Card'
import { cardlist } from '../../../data/cardlist'
import { useState } from 'react'

export const CardManager = () => {
  const [back, setBack] = useState('')
  const [front, setFront] = useState('')
  // TODO remove this sample data handling:
  const [id, setId] = useState(5) // Start with 5 to account for sample data IDs (Installation of UUID package is prohibited ;) )
  const [cardList, setCardList] = useState<Card[]>(cardlist)

  const handleSaveButtonClick = () => {
    const newCard = { id, front, back }
    if (front === '' || back === '') {
      alert('Please fill in all fields!!!')
    } else {
      setId(id + 1)
      setCardList([...cardList, newCard])
      setFront('')
      setBack('')
    }
  }

  const handleDeleteCard = (cardId: number) => {
    setCardList(cardList.filter(card => card.id !== cardId))
  }

  return (
    <>
      <div className={styles.cardManager}>
        <TextInput placeholder="Front" value={front} onChange={setFront} />
        <TextInput placeholder="Back" value={back} onChange={setBack} />
        <Button title="Save" clickHandler={handleSaveButtonClick} />

        {cardList.length === 0 ? (
          <div className={styles.noData}>No Data</div>
        ) : (
          cardList.map(card => (
            <TableRow
              key={card.id}
              item={card}
              handleDeleteButtonClick={handleDeleteCard}
            />
          ))
        )}
      </div>
    </>
  )
}
