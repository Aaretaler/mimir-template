import styles from './AppBar.module.css'
import { MenuItem } from '../../components/MenuItem'
import { useNavigate } from 'react-router-dom'
import { Button } from '../../components/Button'

export const AppBar = () => {
  const navigate = useNavigate()

  return (
    <>
      <div className={styles.appBar}>
        <div className={styles.title}>Mimir</div>
        <Button
          title="game"
          clickHandler={() => {
            navigate('/')
          }}
        />
        <MenuItem />
      </div>
    </>
  )
}
