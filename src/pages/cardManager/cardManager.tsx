import styles from './CardManager.module.css';
import { TableRow } from './TableRow'
import { Button } from '../../components/Button'
import { TextInput } from '../../components/TextInput'
import { TableHeader } from '../../components/TableHeader'
import { Card } from '../../models/Card'
import { cardlist } from '../../data/cardlist'
import { useState } from 'react'


export const CardManager = () => {
  let [back, setBack] = useState('')
  let [front, setFront] = useState('')



  const [id, setId] = useState(5) // Start with 5 to account for sample data IDs (Installation of UUID package is prohibited ;) )
  const [filterActive, setFilterActive] = useState<boolean>(true)
  const [cardList, setCardList] = useState<Card[]>(cardlist)
  const [sortOrderFront, setSortOrderFront] = useState<'asc' | 'desc' | 'none'>(
    'none'
  )
  const [sortOrderBack, setSortOrderBack] = useState<'asc' | 'desc' | 'none'>(
    'none'
  )

  const handleSaveButtonClick = () => {
    const newCard = { id: id, front: front, back: back }
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

  const handleEditCard = (cardId: number) => {
    alert('Card'+cardId+"Should be modifyed")
  }

  const sortAndFilterCards = () => {
    let filteredAndSorted = [...cardList]

    if (filterActive) {
      if (front) {
        filteredAndSorted = filteredAndSorted.filter(card =>
          card.front.toLowerCase().includes(front.toLowerCase())
        )
      }
      if (back) {
        filteredAndSorted = filteredAndSorted.filter(card =>
          card.back.toLowerCase().includes(back.toLowerCase())
        )
      }
    }

    if (sortOrderFront === 'asc') {
      filteredAndSorted.sort((a, b) => a.front.localeCompare(b.front))
    }
    if (sortOrderFront === 'desc') {
      filteredAndSorted.sort((a, b) => b.front.localeCompare(a.front))
    }

    if (sortOrderBack === 'asc') {
      filteredAndSorted.sort((a, b) => a.back.localeCompare(b.back))
    }
    if (sortOrderBack === 'desc') {
      filteredAndSorted.sort((a, b) => b.back.localeCompare(a.back))
    }

    return filteredAndSorted
  }

  return (
    <>
      <div className={styles.cardManager}>
        {/* Filter Area */}
        <TextInput placeholder="Front" value={front} onChange={setFront} />
        <TextInput placeholder="Back" value={back} onChange={setBack} />
        <Button title="Save" clickHandler={handleSaveButtonClick} />
        
        <div />
        <div />
        <div>
          <input
            type="checkbox"
            id="filter"
            name="filter"
            checked={filterActive}
            onChange={e => {
              setFilterActive(e.target.checked)
            }}
          />
          <label>Filter table</label>
        </div>

        {/* Table */}
        <TableHeader
          title="Front"
          sortOrder={sortOrderFront}
          setSortOrder={setSortOrderFront}
          resetSortOrder={setSortOrderBack}
        />
        <TableHeader
          title="Back"
          sortOrder={sortOrderBack}
          setSortOrder={setSortOrderBack}
          resetSortOrder={setSortOrderFront}
        />
        <div />

        {sortAndFilterCards().length === 0 ? (
          <div className={styles.noData}>No Data</div>
        ) : (
          sortAndFilterCards().map(card => (
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
