const express = require('express')
const app = express()
app.use(express.json())
const {open} = require('sqlite')
const sqlite3 = require('sqlite3')
const path = require('path')
const dbpath = path.join(__dirname, 'cricketTeam.db')
let db = null
const initialisedbandserver = async () => {
  try {
    db = await open({
      filename: dbpath,
      driver: sqlite3.Database, //mistakeable
    })
    app.listen(3001, () => {
      console.log('serverIsRunning')
    })
  } catch (e) {
    console.log(`DB error ${e.message}`)
    process.exit(1)
  }
}
initialisedbandserver()
app.get('/players/', async (request, response) => {
  const getplayersquery = `SELECT * FROM cricket_team ORDER BY player_id;`
  const playerArray = await db.all(getplayersquery)
  response.send(playerArray)
  console.log(playerArray)
})

app.post('/players/', async (request, response) => {
  const playerdetails = await request.body
  response.send(playerdetails)
})

module.exports = app
