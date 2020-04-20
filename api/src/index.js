require('dotenv').config()
require = require('esm')(module) // eslint-disable-line
const run = require('./server').default
run()
