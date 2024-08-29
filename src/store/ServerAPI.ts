export class ServerAPI {
  static post(url: string, method: string, body: string): any {
    return fetch(url, {
      method: method,
      headers: { 'Content-Type': 'application/json' },
      body: body,
    })
      .then((resp) => {
        return resp.json()
      })
      .catch(e => {
        alert('Server Error:' + e)
      })
  }

  static get(url: string, method: string): any {
    return fetch(url, {
      method: method,
      headers: { 'Content-Type': 'application/json' },
    })
      .then((resp) => {
        return resp.json()
      })
      .catch(e => {
        alert('Server Error:' + e)
      })
  }
}
