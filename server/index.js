const express = require('express')
const cors = require('cors')
require('dotenv').config()

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors())
app.use(express.json())

// Test route
app.get('/', (req, res) => {
  res.send('MU-ACM Backend is running!')
})

// Routes (we'll add these one by one)
app.use('/api/events', require('./routes/events'))
// app.use('/api/team', require('./routes/team'))
// app.use('/api/gallery', require('./routes/gallery'))
// app.use('/api/testimonials', require('./routes/testimonials'))
// app.use('/api/faculty', require('./routes/faculty'))
app.use('/api/auth', require('./routes/auth'))
// app.use('/api/chatbot', require('./routes/chatbot'))

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})