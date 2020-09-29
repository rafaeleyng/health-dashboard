import path from 'path'

import { configureLogger, getLogger } from './logger'
import { buildApp } from './app'
import { watchLoadData } from './services/dataService'
import { watchGrafanaSetup } from './services/grafanaService'

const run = () => {
  configureLogger()
  const logger = getLogger('server')
  watchLoadData()
  watchGrafanaSetup()

  const app = buildApp()
  const port = process.env.API_PORT || 4000
  app.listen(port, () => logger.info(`json API up on port: ${port}`))
}

export default run
