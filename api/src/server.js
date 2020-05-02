import path from 'path'

import { buildApp } from './app'
import { loadData } from './services/dataService'

const run = () => {
  const dataPath = path.resolve(__dirname, '..', '..', process.env.API_DATA_PATH || 'examples')
  loadData(dataPath)

  const app = buildApp()
  const port = process.env.API_PORT || 4000
  app.listen(port, () => console.log(`[run] json API up on port: ${port}`))
}

export default run
