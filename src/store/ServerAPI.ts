export class ServerAPI {

  static async post(url: string, method: string, body: string, accessToken?: string): Promise<any> {
    try {
      const response = await fetch(url, {
        method: method,
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken || ''}`
        },
        body: body,
      });

      if (!response.ok) {
        throw new Error(`Server Error: ${response.statusText}`);
      }

      return await response.json();

    } catch (e: any) {
      console.error('Server Error:', e); 
      alert('Server Error: ' + e.message);
    }
  }

  static async get(url: string, method: string, accessToken?: string): Promise<any> {
    try {
      const response = await fetch(url, {
        method: method,
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken || ''}`
        },
      });

      if (!response.ok) {
        throw new Error(`Server Error: ${response.statusText}`);
      }
      
      return await response.json();

    } catch (e: any) {
      console.error('Server Error:', e);
      alert('Server Error: ' + e.message);
    }
  }
}