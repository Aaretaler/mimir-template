import styles from './AppBar.module.css'
import { MenuItem } from '../../components/MenuItem'
import { useNavigate } from 'react-router-dom'
import { Button } from '../../components/Button'
import { AppContext, AppStore } from '../../store/Context'
import { useContext, useState } from 'react'

export const AppBar = () => {
  const navigate = useNavigate()
  const [isMenuShown, setMenuVisibility] = useState(false)

  const { game } = useContext(AppContext)

  const getButtonCaption = () => {
    if (!game) return 'New Game'

    if (game.answers.length >= 3) return 'Finished'
    return game.gameCards.length == 0
      ? 'New Game'
      : 'Solve #' + (game.cardIndex + 1)
  }

  //TODO remove login button when no longer needed
  return (
    <>
      <div className={styles.appBar}>
        <div className={styles.flexChildLeft}>
          <div className={styles.title}>Mimir</div>
        </div>
        <div className={styles.flexChildCenter}>
          <Button
            title={getButtonCaption()}
            clickHandler={() => {
              navigate(game.answers.length >= 3 ? '/result' : '/')
            }}
          />
        </div>
        {/* <Button
          title="Login"
          clickHandler={() => {
            navigate('/login');
          }}
        /> */}
        <div className={styles.flexChildRight}>
          <MenuItem />
          <Button
            title="Logout"
            clickHandler={() => {
              AppStore.dispatch({ type: 'logout' })
              navigate('/login')
            }}
          />
        </div>
        <div className={styles.burgerMenuButton}>
          <div onClick={() => setMenuVisibility(!isMenuShown)}>
            {isMenuShown ? 'X' : '\u2630'}
          </div>
        </div>
        {isMenuShown ? (
          <div className={styles.burgerMenu}>
            <div> New Game</div>
            <div> Manage Cards</div>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </>
  )
}
