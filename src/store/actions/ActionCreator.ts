import { get, post } from '../ServerAPI'
import { AppStore } from '../Context'
import { AppAction } from './AppAction'

export const actionCreator = async (action: AppAction) => {
  let url = '/api'
  let method = 'GET'
  let body: string = ''
  let actionType = action.type
  const accessToken = AppStore.user?.accessToken

  switch (action.type) {
    // game
    case 'create-new-game':
      url += `/game/${AppStore.user?.username}`
      method = 'POST'
      actionType = 'new-game'
      break
    case 'submit-answer':
      url += `/answer/${AppStore.user?.username}`
      method = 'POST'
      body = JSON.stringify({ answer: action.payload })
      break
    case 'delete-game':
      url += `/game/${AppStore.user?.username}`
      method = 'DELETE'
      body = JSON.stringify({})
      break
    case 'get-result':
      url += `/result/${AppStore.user?.username}`
      method = 'GET'
      actionType = 'load-game'
      break
    // cards
    case 'add-card':
      url += '/card'
      method = 'POST'
      body = JSON.stringify(action.payload)
      break
    case 'update-card':
      url += '/card'
      method = 'PUT'
      body = JSON.stringify(action.payload)
      break
    case 'delete-card':
      url += '/card'
      method = 'DELETE'
      body = JSON.stringify(action.payload)
      break
    // user management
    case 'send-login':
      url += '/login'
      method = 'POST'
      actionType = 'receive-login'
      body = JSON.stringify(action.payload)
      break
    case 'get-state':
      url += `/state`
      method = 'GET'
      actionType = 'load-state'
      break
    default:
      console.error('Unknown action: ' + action.type)
  }

  if (method === 'GET') {
    await get(url, method, accessToken).then((data: any) => {
      console.log(data)
      AppStore.dispatch({ type: actionType, payload: data })
    })
  } else {
    await post(url, method, body, accessToken).then((data: any) => {
      AppStore.dispatch({ type: actionType, payload: data })
    })
  }
}
