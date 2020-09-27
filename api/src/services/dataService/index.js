import path from 'path'
import requireDir from 'require-dir'
import flatMap from 'lodash/flatMap'

import { normalizeAnnotations } from '../annotationsService'
import { normalizeMetrics } from '../metricsService'

import { getLogger } from '../../logger'

const logger = getLogger('dataService')
let data = {}

export const getDataPath = () => path.resolve(__dirname, '..', '..', '..', '..', process.env.DATA_PATH || 'data')

const loadAnnotations = (dataFolderPath) => {
  let annotations = require(path.resolve(dataFolderPath, 'annotations.js'))

  // compatibility with `esm`
  if (annotations.default) {
    annotations = annotations.default
  }

  return normalizeAnnotations(annotations)
}

const loadMetrics = (dataFolderPath) => {
  const nestedMetrics = requireDir(path.resolve(dataFolderPath, 'metrics'), { recurse: true })

  const metrics = flatMap(nestedMetrics, (value, key) => {
    const isDir = key[0] === key[0].toLowerCase()
    return isDir ? value : { [key]: value }
  })
    .reduce((acc, i) => ({ ...acc, ...i }), {})

  Object.entries(metrics).forEach(([metricName, metricValue]) => {
    // compatibility with `esm`
    if (metricValue.default) {
      metrics[metricName] = metricValue.default
    }
  })

  return normalizeMetrics(metrics)
}

export const loadData = (dataFolderPath) => {
  logger.info(`initializing data from ${dataFolderPath}`)

  const loadedData = {
    annotations: loadAnnotations(dataFolderPath),
    metrics: loadMetrics(dataFolderPath),
  }

  logger.debug('loadedData =', JSON.stringify(loadedData, null, 2))
  data = loadedData
}

export const getData = () => data
