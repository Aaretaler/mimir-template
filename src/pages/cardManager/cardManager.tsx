import './CardManager.css'
import { TableRow } from './TableRow'
import { Button } from '../../components/Button'
import { TextInput } from '../../components/TextInput'
import { TableHeader } from '../../components/TableHeader'
import { Card } from '../../models/Card'

import { SetStateAction, useState } from 'react';

export const CardManager = () => {

  let [back, setBack] = useState('');
  let [front, setFront] = useState('');
  const [id, setId] = useState(0);
  const [filterActive,setFilterActive]= useState<boolean>(false);
  const [cardList, setCardList] = useState<Card[]>([]);
  const [sortOrderFront, setSortOrderFront] = useState<"asc" | "desc" | "none">("none");
  const [sortOrderBack, setSortOrderBack] = useState<"asc" | "desc" | "none">("none");

  const handleSaveButtonClick = () => {    
  const newCard = { id: id, front: front, back: back };
  setId(id+1);
  setCardList([...cardList, newCard]);
  setFront('');
  setBack('');

};

const handleDeleteCard = (cardId: number) => {
  setCardList(cardList.filter(card => card.id !== cardId));
};

  const handleFrontChange = (e: { target: { value: string } }) => {
    const front:string=e.target.value;
    setFront(front);
  };

  const handleBackChange = (e: { target: { value: string } }) => {
    const back:string=e.target.value;
    setBack(back)
  };

  const setFilterVar = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterActive(event.target.checked);
  };

  const sortTableFront = (event: React.MouseEvent<HTMLButtonElement>, sortOrder: React.SetStateAction<"asc" | "desc" | "none">)=>{
   setSortOrderFront(sortOrder);
  };
  const sortTableBack = (event: React.MouseEvent<HTMLButtonElement>, sortOrder: React.SetStateAction<"asc" | "desc" | "none">)=>{
    setSortOrderBack(sortOrder);
    
  };


  const sortAndFilterCards = () => {
    let filteredAndSorted = [...cardList];

    if (filterActive) {
      if (front) {
        filteredAndSorted = filteredAndSorted.filter(card => 
          card.front.toLowerCase().includes(front.toLowerCase()));
      }
      if (back) {
        filteredAndSorted = filteredAndSorted.filter(card => 
          card.back.toLowerCase().includes(back.toLowerCase()));
      }
    }

    if (sortOrderFront === "asc") {
      filteredAndSorted.sort((a, b) => a.front.localeCompare(b.front));
    }
    if (sortOrderFront === "desc") {
      filteredAndSorted.sort((a, b) => b.front.localeCompare(a.front));
    }

    if (sortOrderBack === "asc") {
      filteredAndSorted.sort((a, b) => a.back.localeCompare(b.back));
    }
    if (sortOrderBack === "desc") {
      filteredAndSorted.sort((a, b) => b.back.localeCompare(a.back));
    }


    return filteredAndSorted;
  };

  return(
  <>
    <div className="cardManager">
        {/* Filter Area */}
      <TextInput placeholder='Front' value={front} onChange={handleFrontChange}/>
      <TextInput placeholder='Back'  value={back}  onChange={handleBackChange}/>
      <Button title="Save" clickHandler={handleSaveButtonClick}/>
      <div />
      <div />
      <div>
        <input type="checkbox" id="filter" name="filter"checked={filterActive} onChange={setFilterVar}/>
        <label>Filter table</label>
      </div>

      {/* Table */}
      <TableHeader title='Front' onClick={sortTableFront} />
      <TableHeader title='Back'  onClick={sortTableBack}/>
      <div/>

      {sortAndFilterCards().map(card => (
        <TableRow key={card.id} item={card} handleDeleteButtonClick={handleDeleteCard}/>
      ))}
    </div>
  </>
  );
};
