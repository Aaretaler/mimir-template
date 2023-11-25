import { Button } from '../../components/Button'
import { Card } from '../../models/Card'

interface Props {
  item: Card
  handleDeleteButtonClick: (cardId: number) => void;
}
export const TableRow: React.FC<Props> = ({ item, handleDeleteButtonClick }) => {
  const onDeleteClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    handleDeleteButtonClick(item.id);
  };

  return (
    <>
      <div >{item.front}</div>
      <div>{item.back}</div>
      <Button title="Delete" clickHandler={onDeleteClick}/>
    </>
  );
}

