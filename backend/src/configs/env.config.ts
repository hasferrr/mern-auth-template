const getEnv = (s: string) => {
  const env = process.env[s]
  if (!env) throw new Error(`Missing env: ${s}`)
  return env
}

export const PORT = process.env.PORT
export const BACKEND_URL = getEnv('BACKEND_URL')
export const FRONTEND_URL = getEnv('FRONTEND_URL')
export const SECRET = getEnv('SECRET')
export const MONGODB_URI = getEnv('MONGODB_URI')
export const GOOGLE_CLIENT_ID = getEnv('GOOGLE_CLIENT_ID')
export const GOOGLE_CLIENT_SECRET = getEnv('GOOGLE_CLIENT_SECRET')
