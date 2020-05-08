import path from 'path'

import { configureLogger } from './logger'
import { buildApp } from './app'
import { loadData } from './services/dataService'

const run = () => {
  configureLogger()

  const dataPath = path.resolve(__dirname, '..', '..', process.env.DATA_PATH || 'data')
  loadData(dataPath)

  const app = buildApp()
  const port = process.env.API_PORT || 4000
  app.listen(port, () => console.log(`[run] json API up on port: ${port}`))
}

export default run
