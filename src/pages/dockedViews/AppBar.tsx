import styles from './AppBar.module.css'
import { MenuItem } from '../../components/MenuItem'
import { useNavigate } from 'react-router-dom'
import { Button } from '../../components/Button'
import { AppContext } from '../../store/Context'
import { useContext } from 'react'

export const AppBar = () => {
  const navigate = useNavigate()

  const { game } = useContext(AppContext);

  const getButtonCaption = () => {
    if (!game) return 'New Game';

    if (game.answers.length >= 3) return 'Finished';
    return game.gameCards.length == 0 ? 'New Game' : 'Solve #' + (game.cardIndex + 1);
  }

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
        <MenuItem />
      </div>
    </>
  )
}
