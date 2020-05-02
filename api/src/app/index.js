import express from 'express'
import bodyParser from 'body-parser'

import rootRouter from '../routers/root'

const morgan = require('morgan') // not compatible with import

export const buildApp = (data) => {
  const app = express()

  // middlewares
  app.use(bodyParser.json())
  app.use(morgan('tiny'))

  // routes
  app.use('/', rootRouter)

  return app
}
