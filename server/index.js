const express = require('express')
const path = require('path')
const axios = require('axios')

const cookieParser = require('cookie-parser')
const session = require('cookie-session')

const app = express()
const port = 5000

const API_URL = process.env.API_URL || 'http://localhost:1337'

// Middlewares
app.use(express.static(path.join(__dirname, 'frontend/build'))) // change path to build folder if different
app.use(express.json())
app.use(cookieParser())
app.use(session({ name: 'jwt', keys: ['abc'] }))

/**  ROUTES SECTION **/

/** GET Routes */

// Persisting user in session
app.get('/users/me', async (req, res) => {
  const { jwt } = req.session

  try {
    const meRes = await axios({
      method: 'GET',
      url: `${API_URL}/users/me`,
      headers: {
        Authorization: `Bearer ${jwt}`
      }
    })
    res.send(meRes.data)
  } catch (error) {
    console.error(error)
  }
})

// Logout route
app.get('/users/logout', (req, res) => {
  req.session.jwt = null
  res.send({ status: 200 })
})

/** POST Routes */



/** PUT Routes */

// Update User
app.put('/users/:userId', async (req, res) => {
  const jwtToken = req.session.jwt
  const data = req.body
  const { userId } = req.params
   
  const updateUserRes = await axios({
    method: 'PUT',
    url: `${API_URL}/users/${userId}`,
    data,
    headers: {
      Authorization: `Bearer ${jwtToken}`
    }
  })

  res.send(updateUserRes.data)
})

/** DELETE Routes */



/** AUTH Routes */

// authentication - /api/auth/local
app.post('/api/auth/local', async (req, res) => {
  const loginRes = await axios({
    method: 'POST',
    url: `${API_URL}/auth/local`,
    data: req.body
  })

  const { jwt, user } = loginRes.data
  req.session.jwt = jwt

  const data = { user }
  res.send(data)
})

// registration - /api/auth/local/register
app.post('/api/auth/local/register', async (req, res) => {
  const newUserRes = await axios({
    method: 'POST',
    url: `${API_URL}/auth/local/register`,
    data: req.body
  })

  const { jwt, user } = newUserRes.data
  req.session.jwt = jwt

  const data = { user }
  res.send(data)
})

// last route, catch all
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/frontend/build/index.html'))
})

app.listen(port, () => console.log(`Server running on port ${port}`))