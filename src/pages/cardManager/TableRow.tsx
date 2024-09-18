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
    <div className={styles.gridblockOuter}>
      <div className={styles.gridblockText}>
        <div className={styles.itemText1}>{item.front}</div>
        <div className={styles.itemText2}>{item.back}</div>
      </div>
      <div className={styles.gridblockButton}>
        <Button
          title="Edit"
          clickHandler={() => {
            handleEditButtonClick(item.id)
          }}
        />
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
