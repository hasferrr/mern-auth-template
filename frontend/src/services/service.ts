import axios from 'axios'
const baseUrl = import.meta.env.VITE_BACKEND_URL

let token: string | null = null

export const setToken = (newToken: string) => {
  token = `Bearer ${newToken}`
  return token
}

export const getUser = async () => {
  const config = {
    // headers: { Authorization: token }, // send bearer token
    withCredentials: true, // send cookie
  }
  const res = await axios.get(`${baseUrl}/user`, config)
  return res.data
}
