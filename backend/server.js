const express = require('express')
const { connect } = require('mongoose')
require('dotenv').config()
const mongoose = require('mongoose')
const app = express()
const connectDB = require('./config/db')
const cors = require('cors')

const taskRoutes = require('./routes/taskRoutes')

const PORT = process.env.PORT || 5000

// middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors()) // this needs to come before the routes
app.use('/api/tasks/', taskRoutes)

app.get('/', (req, res) => {
  res.send('ayy bro!')
})

const startServer = async () => {
  try {
    await connectDB()
    app.listen(PORT, () => {
      console.log(`Server is running on port: ${PORT}`)
    })
  } catch (error) {
    console.log(error)
  }
}
startServer()
