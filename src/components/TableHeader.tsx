import styles from './TableHeader.module.css';
interface Props {
  title: string
  sortOrder: 'asc' | 'desc' | 'none'
  setSortOrder: (sortOder: 'asc' | 'desc' | 'none') => void
  resetSortOrder: (sortOder: 'asc' | 'desc' | 'none') => void
}

export const TableHeader = ({
  title,
  sortOrder,
  setSortOrder,
  resetSortOrder,
}: Props) => {
  const handleClick = () => {
    let nextSortOrder: 'asc' | 'desc' | 'none' = sortOrder
    switch (sortOrder) {
      case 'none':
        nextSortOrder = 'asc'
        break

      case 'asc':
        nextSortOrder = 'desc'
        break

      case 'desc':
        nextSortOrder = 'none'
        break
    }
    setSortOrder(nextSortOrder)
    resetSortOrder('none')
  }

  let sortArrow = ''
  if (sortOrder === 'asc') {
    sortArrow = '▲'
  } else if (sortOrder === 'desc') {
    sortArrow = '▼'
  } else if (sortOrder === 'none') {
    sortArrow = ''
  }

  return (
    <button className={styles.invisibleButton} onClick={handleClick}>
      {title + sortArrow}
    </button>
  )
}
