import path from 'path'

import { configureLogger } from './logger'
import { buildApp } from './app'
import { getDataPath, loadData } from './services/dataService'

const run = () => {
  configureLogger()

  loadData(getDataPath())

  const app = buildApp()
  const port = process.env.API_PORT || 4000
  app.listen(port, () => console.log(`[run] json API up on port: ${port}`))
}

export default run
