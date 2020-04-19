require('dotenv').config()

const express = require('express')
const requireDir = require('require-dir')

const loadData = (dataPath) => {
  const data = requireDir(dataPath)
  return data
}

const rootHandler = () => (req, res) => res.end()
const searchHandler = (data) => (req, res) => res.json(Object.keys(data))
const queryHandler = (data) => (req, res) => res.send('query result')
const annotationsHandler = (data) => (req, res) => res.send('annotations result')

const buildApp = (data) => {
  const app = express()
  app.get('/', rootHandler()) // used to test the connection
  app.post('/search', searchHandler()) // expose what metrics are available
  app.post('/query', queryHandler()) // handles the actual data query
  app.post('/annotations', annotationsHandler())
  return app
}

const main = () => {
  const dataPath = process.env.DATA_PATH || '../data/sample'
  const data = loadData(dataPath)
  console.log('### data', data)

  const app = buildApp(data)
  const port = process.env.PORT || 4000
  app.listen(port, () => console.log(`JSON API up on port: ${port}`))
}

main()
