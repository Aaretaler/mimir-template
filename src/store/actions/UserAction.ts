import { Credentials } from "../../models/Credentials"
import { User } from "../../models/User"


type SendLoginAction = {
    type: 'send-login'
    payload: Credentials
  }

type ReceiveLoginAction = {
  type: 'receive-login'
  payload: User
}

type LogoutAction = {
  type: 'logout'
}

export type UserAction =
  | SendLoginAction
  | ReceiveLoginAction
  | LogoutAction
