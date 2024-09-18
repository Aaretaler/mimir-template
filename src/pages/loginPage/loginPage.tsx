import styles from './loginPage.module.css'
import { TextInput } from '../../components/TextInput'
import { Button } from '../../components/Button'
import { useContext, useState } from 'react'
import { AppContext } from '../../store/Context'
import { useNavigate, useParams } from 'react-router-dom'
import { actionCreator } from '../../store/actions/ActionCreator'

export const LoginPage = () => {
  const navigate = useNavigate()
  const { user } = useContext(AppContext)
  let [username, setUsername] = useState('')
  let [password, setPassword] = useState('')
  let [attemptFailed, setAttemptFailed] = useState(false)

  const login = () => {
    actionCreator({ type: 'send-login', payload: {username: username, password: password} })
  }

  return (
    <div className={styles.loginPage}>
      <div className={styles.TableHeader}>Username</div>
      <div className={styles.TableHeader}>Password</div>
      <div />
      <TextInput placeholder="Username" value={username} onChange={setUsername} />
      <TextInput placeholder="Password" value={password} onChange={setPassword} />
      <Button title="Login" clickHandler={login} />
      {attemptFailed && <div className={styles.warning}>Invalid Credentials</div>}
      <div className={styles.TableHeader}>{user ? user.username : "None"}</div>
    </div>
  )
}
