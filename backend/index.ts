import app from './src/app'

const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
  console.log(`Server is running on http://localhost:${PORT}`)
})
