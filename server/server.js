require('dotenv').config()
const express = require('express')
const session = require('express-session')
const massive = require('massive')
const {SERVER_PORT, CONNECTION_STRING, SESSION_SECRET} = process.env
const authCtrl = require('./authController')

const app = express()

app.use(express.json())
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: SESSION_SECRET
}))
// end points
app.post('/auth/register', authCtrl.register)
app.post('/auth/login', authCtrl.lgoin)
app.delete('/auth/logout', authCtrl.logout)


massive(CONNECTION_STRING).then(db => {
    app.set('db', db) 
    app.listen(SERVER_PORT, () => console.log(`Port is running on: ${SERVER_PORT}`))
})
