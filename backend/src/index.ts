import app from './app'
import { PORT } from './configs/env.config'

app.listen(PORT || 8080, () => {
  console.log(`Listening on port ${PORT}`)
  console.log(`Server is running on http://localhost:${PORT}`)
})
