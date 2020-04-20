import express from 'express'
import bodyParser from 'body-parser'
import requireDir from 'require-dir'

const loadData = (dataPath) => {
  const data = requireDir(dataPath, { recurse: true })
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
    const targetData = metrics[targetName].default

    const resTargets = targetData.map((data) => ({
      target: `${targetName} (${data.target})`,
      datapoints: data.datapoints
    }))

    return [...acc, ...resTargets]
  }, [])

  res.json(result)
}

const annotationsHandler = ({ annotations }) => (req, res) => res.json(annotations.default)

const buildApp = (data) => {
  const app = express()
  app.use(bodyParser.json())
  app.get('/', rootHandler()) // used to test the connection
  app.post('/search', searchHandler(data)) // expose what metrics are available
  app.post('/query', queryHandler(data)) // handles the actual data query
  app.post('/annotations', annotationsHandler(data))
  return app
}

const run = () => {
  const dataPath = process.env.DATA_PATH || '../data/sample'
  const data = loadData(dataPath)

  const app = buildApp(data)
  const port = process.env.PORT || 4000
  app.listen(port, () => console.log(`json API up on port: ${port}`))
}

export default run
