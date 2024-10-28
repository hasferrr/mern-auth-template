import { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import { getUser, setToken } from './services/service'

const App = () => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const token = Cookies.get('jwt')
    if (token) {
      setToken(token)
      const getAndSetUserData = async () => {
        const data = await getUser()
        setUser(data.user)
      }
      getAndSetUserData()
    }
  }, [])

  const handleLogOut = () => {
    Cookies.remove('jwt')
    setUser(null)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <h1>Welcome</h1>
      <a href={`${import.meta.env.VITE_BACKEND_URL}/auth/google`} style={{ width: 0 }}>
        <button style={{ width: '10rem' }}>
          Sign in with Google
        </button>
      </a>
      <button onClick={handleLogOut} style={{ width: '10rem' }}>
        Log Out
      </button>
      <div>{JSON.stringify(user)}</div>
    </div>
  )
}

export default App
