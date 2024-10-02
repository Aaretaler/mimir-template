import styles from './loginPage.module.css'
import { PasswordInput, TextInput } from '../../components/TextInput'
import { Button } from '../../components/Button'
import { useContext, useState, useEffect } from 'react'
import { AppContext } from '../../store/Context'
import { actionCreator } from '../../store/actions/ActionCreator'
import { useNavigate } from 'react-router-dom'

export const LoginPage = () => {
  const navigate = useNavigate()
  const { user, loginFailed } = useContext(AppContext)
  let [username, setUsername] = useState('')
  let [password, setPassword] = useState('')
  let [loginButtonPressed, setLoginButtonPressed] = useState(false)

  const login = async () => {
    setLoginButtonPressed(true) // Avoids navigating away from the page when already logged in (user change)
    actionCreator({ type: 'send-login', payload: { username: username, password: password } })

    console.warn("loginFailed: " + loginFailed)
  }

  useEffect(() => {
    if (user && loginButtonPressed) {
      actionCreator({ type: 'get-state'})
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
      {loginFailed && <div className={styles.warning}> {'\u26A0'} Invalid Credentials</div>}
    </div>
  )
}
