import styles from './App.module.css'
import { Outlet } from 'react-router-dom'
import { AppBar } from './pages/dockedViews/AppBar'

export function Layout() {
  return (
    <div className={styles.app__container}>
      <AppBar />
      <Outlet />
    </div>
  )
}
