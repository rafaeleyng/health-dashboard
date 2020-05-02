import path from 'path'
import requireDir from 'require-dir'
import flatMap from 'lodash/flatMap'

import { normalizeAnnotations } from '../annotationsService'
import { normalizeMetrics } from '../metricsService'

import { getLogger } from '../../logger'

const logger = getLogger('dataService')
const data = {}

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
  logger.debug(`initializing data from ${dataFolderPath}`)

  data.annotations = loadAnnotations(dataFolderPath)
  data.metrics = loadMetrics(dataFolderPath)

  logger.info('data =', JSON.stringify(data, null, 2))
  return data
}

export const getData = () => data
