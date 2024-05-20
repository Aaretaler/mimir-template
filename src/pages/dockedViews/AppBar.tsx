import styles from './AppBar.module.css'
import { MenuItem } from '../../components/MenuItem'
import { Link } from 'react-router-dom';

export const AppBar = () => (
  <>
    <div className={styles.appBar}>
      <div className={styles.title}>Mimir</div>
      <MenuItem />
    </div>
  </>
)
