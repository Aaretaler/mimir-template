export function post(url: string, method: string, body: string): Promise<any> {
  return fetch(url, {
    method: method,
    headers: { 'Content-Type': 'application/json' },
    body: body,
  })
    .then((resp) => {
      if (!resp.ok) {
        throw new Error(`HTTP-Fehler! Status: ${resp.status}`);
      }
      return resp.json();
    })
    .then(data => {
      return data;
    })
    .catch(e => {
      console.error('Serverfehler:', e);
      alert('Serverfehler: ' + e.message);
    });
}

export function get(url: string, method: string): Promise<any> {
  return fetch(url, {
    method: method,
    headers: { 'Content-Type': 'application/json' },
  })
    .then((resp) => {
      if (!resp.ok) {
        throw new Error(`HTTP-Fehler! Status: ${resp.status}`);
      }
      return resp.json();
    })
    .then(data => {
      return data;
    })
    .catch(e => {
      console.error('Serverfehler:', e);
      alert('Serverfehler: ' + e.message);
    });
}

