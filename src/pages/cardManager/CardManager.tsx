import styles from './CardManager.module.css'
import { TableRow } from './TableRow'
import { Button } from '../../components/Button'
import { TextInput } from '../../components/TextInput'
import { Card } from '../../models/Card'
import { useEffect, useState } from 'react'
import { useReducer } from 'react';
import { reducer } from '../../store/reducer'
import { addCard,deleteCard,getcards } from '../../store/action'
import { useNavigate } from 'react-router-dom'

export const CardManager = () => {
  const [back, setBack] = useState('')
  const [front, setFront] = useState('')
  // TODO remove this sample data handling:
  const [id, setId] = useState(5) // Start with 5 to account for sample data IDs (Installation of UUID package is prohibited ;) )
  const navigate = useNavigate()
  const [state, dispatch] = useReducer(reducer, [] as Card[]);

  useEffect(()=>{
    getcards(dispatch)
  },[])

  const handleSaveButtonClick = () => {
    const newCard = { id, front, back }
    
    if (front === '' || back === '') {
      alert('Please fill in all fields!!!')
    } else {
      setId(id + 1)
      addCard(newCard, dispatch);      
      setFront('')
      setBack('')
    }
  }

  const handleDeleteCard = (delete1Card: Card) => {
    deleteCard(delete1Card,dispatch)
  }
const handleEditCard =(updateCard: Card) =>{
  navigate(`/edit/${updateCard.id}`);
}

  return (
    <>
      <div className={styles.cardManager}>
        <TextInput placeholder="Front" value={front} onChange={setFront} />
        <TextInput placeholder="Back" value={back} onChange={setBack} />
        <Button title="Save" clickHandler={handleSaveButtonClick} />

        {state.length === 0 ? (
          <div className={styles.noData}>No Data</div>
        ) : (
          state.map((card:any) => (
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