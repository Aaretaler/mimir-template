import styles from './loginPage.module.css'
import { PasswordInput, TextInput } from '../../components/TextInput'
import { Button } from '../../components/Button'
import { useContext, useState, useEffect } from 'react'
import { AppContext } from '../../store/Context'
import { actionCreator } from '../../store/actions/ActionCreator'
import { useNavigate } from 'react-router-dom'

export const LoginPage = () => {
  const navigate = useNavigate()
  const { user } = useContext(AppContext)
  let [username, setUsername] = useState('')
  let [password, setPassword] = useState('')
  let [attemptFailed, setAttemptFailed] = useState(false)

  const login = async () => {
    const result = await actionCreator({ type: 'send-login', payload: { username: username, password: password } })
  }

  useEffect(() => {
    if (user) {
      navigate('/')
    }
  }, [user, navigate]) 

  return (
    <div className={styles.loginPage}>
      <div className={styles.TableHeader}>Username</div>
      <div className={styles.TableHeader}>Password</div>
      <div />
      <TextInput
        placeholder="Username"
        value={username}
        onChange={setUsername}
      />
      <PasswordInput
        placeholder="Password"
        value={password}
        onChange={setPassword}
      />
      <Button title="Login" clickHandler={login} />
      {attemptFailed && <div className={styles.warning}>Invalid Credentials</div>}
      <div className={styles.TableHeader}>
        {user ? "Actual user: " + user.username : "No User Logged in"}
      </div>
    </div>
  )
}
