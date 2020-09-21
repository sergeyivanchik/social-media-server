const express = require('express')
const config = require('config')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const jsonParser = express.json()
const cors = require('cors')
const toJson = require('@meanie/mongoose-to-json')
const { app, server } = require('./socket')

const PORT = config.get('port') || 5000

mongoose.plugin(toJson);

require('./api/utils/db.js').setUpConnection()
require('./api/models/user')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(cors())
app.use(jsonParser)

app.use('/',require('./api/routes/index'))

server.listen(PORT, () => console.log(`App has been started on port ${PORT}...`))
