import styles from './App.module.css'
import { AppBar } from './pages/dockedViews/AppBar'
import { Outlet } from 'react-router-dom'

export function Layout() {
  return (
    <div className={styles.app__container}>
      <AppBar />
      <Outlet />
    </div>
  )
}
