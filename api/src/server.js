import path from 'path'
import express from 'express'
import bodyParser from 'body-parser'
import requireDir from 'require-dir'

const morgan = require('morgan') // not compatible with import

const loadData = (dataPath) => {
  const data = {
    metrics: {}
  }

  const annotations = require(path.resolve(__dirname, dataPath, 'annotations.js'))
  const metrics = requireDir(path.resolve(__dirname, dataPath, 'metrics'))

  // compatibility with "esm"
  if (annotations.default) {
    data.annotations = annotations.default
  }
  Object.entries(metrics).forEach(([metricName, metricValue]) => {
    if (metricValue.default) {
      data.metrics[metricName] = metricValue.default
    }
  })

  return data
}

const rootHandler = () => (req, res) => res.end()

const searchHandler = ({ metrics }) => (req, res) => res.json(Object.keys(metrics))

// TODO filter data by period?
const queryHandler = ({ metrics }) => (req, res) => {
  const { targets } = req.body

  if (!targets || !targets.length || !targets[0].target) {
    res.json([])
    return
  }

  const result = targets.reduce((acc, reqTarget) => {
    const targetName = reqTarget.target
    const targetData = metrics[targetName]

    const resTargets = targetData.map((data) => ({
      target: `${targetName} (${data.target})`,
      datapoints: data.datapoints
    }))

    return [...acc, ...resTargets]
  }, [])

  res.json(result)
}

const annotationsHandler = ({ annotations }) => (req, res) => res.json(annotations)

const buildApp = (data) => {
  const app = express()
  app.use(bodyParser.json())
  app.use(morgan('tiny'))
  app.get('/', rootHandler()) // used to test the connection
  app.post('/search', searchHandler(data)) // expose what metrics are available
  app.post('/query', queryHandler(data)) // handles the actual data query
  app.post('/annotations', annotationsHandler(data))
  return app
}

const run = () => {
  const dataPath = path.resolve(__dirname, '..', '..', process.env.API_DATA_PATH || 'examples')
  const data = loadData(dataPath)

  const app = buildApp(data)
  const port = process.env.API_PORT || 4000
  app.listen(port, () => console.log(`json API up on port: ${port}`))
}

export default run
