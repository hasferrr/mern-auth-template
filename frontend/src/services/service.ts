import axios from 'axios'
const baseUrl = 'http://localhost:8080/user'

let token: string | null = null

export const setToken = (newToken: string) => {
  token = `Bearer ${newToken}`
}

export const getUser = async () => {
  const config = {
    headers: { Authorization: token },
  }
  const res = await axios.get(baseUrl, config)
  return res.data
}
