import { ServerAPI } from '../ServerAPI'
import { AppStore } from '../Context'
import { AppAction } from './AppAction'

export const actionCreator = (action: AppAction) => {
  let url = '/api'
  let method = 'GET'
  let body: string = ''
  let actionType = action.type

  switch (action.type) {
    // game
    case 'create-new-game':
      url += '/game'
      method = 'POST'
      actionType = 'new-game'
      break
    case 'submit-answer':
      url += '/answer'
      method = 'POST'
      body = JSON.stringify({ answer: action.payload })
      break
    case 'delete-game':
      url += '/game'
      method = 'DELETE'
      body = JSON.stringify({})
      break
    case 'get-result':
      url += '/result'
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
    default:
      console.error('Unknown action: ' + action.type)
  }

  if (method === 'GET') {
    ServerAPI.get(url, method).then((data: any) => {
      console.log(data)
      AppStore.dispatch({ type: actionType, payload: data })
    })
  } else {
    ServerAPI.post(url, method, body).then((data: any) => {
      AppStore.dispatch({ type: actionType, payload: data })
    })
  }
}
