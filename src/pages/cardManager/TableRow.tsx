import styles from './TableRow.module.css';
import { Button } from '../../components/Button'
import { Card } from '../../models/Card'
import { Fragment } from 'react'

interface Props {
  item: Card
  handleDeleteButtonClick: (cardId: number) => void
}
export const TableRow = ({ item, handleDeleteButtonClick }: Props) => {
  return (
    <Fragment key={item.id}>
      <div className={styles.itemText}>{item.front}</div>
      <div className={styles.itemText}>{item.back}</div>
      <Button
        title="Delete"
        clickHandler={_ => {
          handleDeleteButtonClick(item.id)
        } } />
    </Fragment>
  )
}
