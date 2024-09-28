export class ServerAPI {

  static post(url: string, method: string, body: string, accessToken? : string): any {
    return fetch(url, {
      method: method,
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${accessToken}`},
      body: body,
    })
      .then((resp) => {
        //TODO refactor
        const response = resp.json()
        console.log(resp.ok)
        console.log(response)

        if(resp.ok) return response
      })
      .catch(e => {
        console.log('Server Error:' + e)
        alert('Server Error:' + e)
      })
  }

  static get(url: string, method: string, accessToken?: string): any {
    return fetch(url, {
      method: method,
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${accessToken}`},
    })
      .then((resp) => {
        return resp.json()
      })
      .catch(e => {
        alert('Server Error:' + e)
      })
  }
}
