const express = require('express')
const app = express()
const cors = require('cors')
const router = require('./routes/blogs')
const mongoose = require('mongoose')
require('dotenv').config()

mongoose.set('strictQuery', false)

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

app.use(cors())
app.use(express.json())

app.use('/api/blogs', router)

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`)
})

module.exports = app