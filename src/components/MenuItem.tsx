import { Link } from 'react-router-dom';
import styles from './MenuItem.module.css';

export const MenuItem = () => <Link data-testid="manage-cards" to="/cards" className={styles.menuItem}>Manage Cards</Link>
