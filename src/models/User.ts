export interface User {
  username: string
  roles: string[]
  accessToken: string
}

// Function to store a User object in localStorage
export function saveUserToLocalStorage(user: User | null): void {
  const jsonString = JSON.stringify(user) 
  localStorage.setItem('user', jsonString)
}

// Function to retrieve a User object from localStorage in a type-safe way
export function getUserFromLocalStorage(): User | null {
  const jsonString = localStorage.getItem('user')

  if (jsonString) {
    try {
      const user: User = JSON.parse(jsonString)
      return user
    } catch (error) {
      console.error('Error parsing JSON from localStorage', error)
      return null
    }
  }

  return null // If there's no item in localStorage, return null
}
