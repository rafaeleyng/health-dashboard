import express from 'express'
import bodyParser from 'body-parser'
import promBundle from 'express-prom-bundle'

import rootRouter from '../routers/root'

const metricsMiddleware = promBundle({ includeMethod: true, includePath: true })
const morgan = require('morgan') // not compatible with import

export const buildApp = (data) => {
  const app = express()

  // middlewares
  app.use(bodyParser.json())
  app.use(morgan('tiny'))
  app.use(metricsMiddleware)

  // routes
  app.use('/', rootRouter)

  return app
}
