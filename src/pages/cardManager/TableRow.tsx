import styles from './TableRow.module.css';
import { Button } from '../../components/Button'
import { Card } from '../../models/Card'
import { Fragment } from 'react'

interface Props {
  item: Card
  handleDeleteButtonClick: (cardId: number) => void
  handleEditButtonClick: (cardId: number) => void
}
export const TableRow = ({ item, handleDeleteButtonClick,handleEditButtonClick }: Props) => {
  return (
    <Fragment key={item.id}>
      <div className={styles.itemText}>{item.front}</div>
      <div className={styles.itemText}>{item.back}</div>
      <div>
      <Button
        title="Edit"
        clickHandler={() => {
          handleEditButtonClick(item.id)
        } } />
      <Button
        title="Delete"
        clickHandler={() => {
          handleDeleteButtonClick(item.id)
        } } />
        </div>
    </Fragment>
  )
}
