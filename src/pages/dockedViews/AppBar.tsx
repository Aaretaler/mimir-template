import styles from './AppBar.module.css'
import { MenuItem } from '../../components/MenuItem'
import { useNavigate } from 'react-router-dom'
import { Button } from '../../components/Button'
import { AppContext, AppStore } from '../../store/Context'
import { useContext, useEffect, useState } from 'react'

export const AppBar = () => {
  const navigate = useNavigate()
  const [isMenuShown, setMenuVisibility] = useState(false)

  const { game, user } = useContext(AppContext)

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 600) {
        setMenuVisibility(false)
      }
    }

    addEventListener('resize', onResize)

    return () => {
      removeEventListener('resize', onResize)
    }
  }, [])

  const getButtonCaption = () => {
    if (!game) return 'New Game'

    if (game.answers.length > 0 && (game.answers.length >= game.gameCards.length)) return 'Finished'
    return game.gameCards.length == 0
      ? 'New Game'
      : 'Solve #' + (game.cardIndex + 1)
  }
  return (
    <>
      <div className={styles.appBar}>
        <div className={styles.flexChildLeft}>
          <div className={styles.title}>
            Mimir
            <span className={styles.username}>
              {user ? user.username : 'Guest'}
            </span>
          </div>
        </div>
        <div className={styles.flexChildCenter}>
          <Button
            title={getButtonCaption()}
            clickHandler={() => {
              navigate((game.answers.length > 0 && (game.answers.length >= game.gameCards.length)) ? '/result' : '/')
            }}
          />
        </div>
        <div className={styles.flexChildRight}>
          {user?.roles.includes('admin') && <MenuItem />}
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
            <div className={styles.buttonsInBurgerMenue}>
              <Button
                title={getButtonCaption()}
                clickHandler={() => {
                  setMenuVisibility(!isMenuShown)
                  navigate(game.answers.length >= 3 ? '/result' : '/')
                }}
              />
              {user?.roles.includes('admin') && (
                <Button
                  title="Manage Cards"
                  clickHandler={() => {
                    setMenuVisibility(!isMenuShown)
                    navigate('/cards')
                  }}
                />
              )}
              <Button
                title="Logout"
                clickHandler={() => {
                  setMenuVisibility(!isMenuShown)
                  AppStore.dispatch({ type: 'logout' })
                  navigate('/login')
                }}
              />
            </div>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </>
  )
}
