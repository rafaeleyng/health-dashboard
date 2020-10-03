import ms from 'ms'

import { configureLogger, getLogger } from './logger'
import { buildApp } from './app'
import { watchLoadData } from './services/dataService'
import { watchGrafanaSetup } from './services/grafanaService'

const run = () => {
  configureLogger()
  const logger = getLogger('server')

  setTimeout(watchLoadData, ms('15s'))
  setTimeout(watchGrafanaSetup, ms('15s'))

  const app = buildApp()
  const port = process.env.API_PORT || 4000
  app.listen(port, () => logger.info(`json API up on port: ${port}`))
}

export default run
