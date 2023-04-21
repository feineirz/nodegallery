const path = require('path')

const dbconfig = require('./config/dbconfig')

const express = require('express')
const mongoose = require('mongoose')
const session = require('express-session')
const exp = require('constants')
const mongodbStore = require('express-mongodb-session')(session)
const store = new mongodbStore({
    uri: dbconfig.MONGODB_URI,
    collection: 'sessions',
})
store.on('error', err => {
    console.log(err)
    process.exit(3)
})

const app = express()
app.use(
    session({
        secret: 'session secret',
        store: store,
        resave: false,
        saveUninitialized: false,
    })
)

// init app
app.set('views', 'views')
app.set('view engine', 'ejs')

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(express.static(path.join(__dirname, 'public')))

// connect-flash
const flash = require('connect-flash')
app.use(flash())

const cors = require('cors')
app.use(cors())

// Response local variable
app.use((req, res, next) => {
    res.locals.flashSuccess = undefined
    res.locals.flashError = undefined
    res.locals.currentUser = undefined

    res.locals.pageName = 'home'
    res.locals.pageTitle = 'Home'
    next()
})

// Routes
const homeRoutes = require('./routes/homeRoutes')

app.use(homeRoutes)

// Init database and running the server
mongoose
    .connect(dbconfig.MONGODB_URI)
    .then(data => {
        console.log('MongoDB database connected.')
        app.listen(dbconfig.PORT, () => {
            console.log(`Listening on port ${dbconfig.PORT}...`)
        })
    })
    .catch(err => {
        console.log(err)
        process.exit(1)
    })
