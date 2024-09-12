import styles from './AppBar.module.css'
import { MenuItem } from '../../components/MenuItem'
import { useNavigate } from 'react-router-dom'
import { Button } from '../../components/Button'
import { AppContext, AppStore } from '../../store/Context'
import { useContext } from 'react'

export const AppBar = () => {
  const navigate = useNavigate()

  const { game } = useContext(AppContext);

  const getButtonCaption = () => {
    if (!game) return 'New Game';

    if (game.answers.length >= 3) return 'Finished';
    return game.gameCards.length == 0 ? 'New Game' : 'Solve #' + (game.cardIndex + 1);
  }

  //TODO remove login button when no longer needed
  return (
    <>
      <div className={styles.appBar}>
        <div className={styles.title}>Mimir</div>
        <Button
          title={getButtonCaption()}
          clickHandler={() => {
            navigate(game.answers.length >= 3 ? '/result' : '/');
          }}
        />
        <Button
          title="Login"
          clickHandler={() => {
            navigate('/login');
          }}
        />
        <Button
          title="Logout"
          clickHandler={() => {
            AppStore.dispatch({ type: 'logout'})
            navigate('/login');
          }}
        />
        <MenuItem />
      </div>
    </>
  )
}
