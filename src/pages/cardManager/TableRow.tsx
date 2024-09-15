import styles from './TableRow.module.css'
import { Button } from '../../components/Button'
import { Card } from '../../models/Card'
import { Fragment } from 'react'

interface Props {
  item: Card
  handleDeleteButtonClick: (cardId: string) => void
  handleEditButtonClick: (cardId: string) => void
}

export const TableRow = ({
  item,
  handleDeleteButtonClick,
  handleEditButtonClick,
}: Props) => (
  <Fragment key={item.id}>
      <div className={styles.gridblock}>
    <div className={styles.itemText1}>{item.front}</div>
    <div className={styles.itemText2}>{item.back}</div>

      <div className={styles.itemButton1}>
      <Button
        title="Edit"
        clickHandler={() => {
          handleEditButtonClick(item.id)
        }}
      />
        </div>
        <div className={styles.itemButton2}>
      <Button
        title="Delete"
        clickHandler={() => {
          handleDeleteButtonClick(item.id)
        }}
      />
      </div>
      </div> 
    
  </Fragment>
)
