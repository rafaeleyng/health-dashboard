import path from 'path'
import requireDir from 'require-dir'
import flatMap from 'lodash/flatMap'

import { normalizeAnnotations } from '../annotationsService'
import { normalizeMetrics } from '../metricsService'

import { getLogger } from '../../logger'

const logger = getLogger('dataService')
let data = {}

const dataFolderPath = path.resolve(__dirname, '..', '..', '..', '..', process.env.DATA_PATH || 'data')

const loadAnnotations = () => {
  let annotations = require(path.resolve(dataFolderPath, 'annotations.js'))

  // compatibility with `esm`
  if (annotations.default) {
    annotations = annotations.default
  }

  return normalizeAnnotations(annotations)
}

const loadMetrics = () => {
  const nestedMetrics = requireDir(path.resolve(dataFolderPath, 'metrics'), { recurse: true })

  const metrics = flatMap(nestedMetrics, (value, key) => {
    const isDir = key[0] === key[0].toLowerCase()
    return isDir ? value : { [key]: value }
  })
    .reduce((acc, i) => ({ ...acc, ...i }), {})

  Object.entries(metrics).forEach(([key, value]) => {
    // compatibility with `esm`
    if (value.default) {
      metrics[key] = value.default
    }
  })

  return normalizeMetrics(metrics)
}

const loadDashboards = () => {
  const dashboards = requireDir(path.resolve(dataFolderPath, 'dashboards'))

  Object.entries(dashboards).forEach(([key, value]) => {
    // compatibility with `esm`
    if (value.default) {
      dashboards[key] = value.default
    }
  })

  return dashboards
}

export const loadData = () => {
  logger.info(`initializing data from ${dataFolderPath}`)

  const loadedData = {
    annotations: loadAnnotations(),
    metrics: loadMetrics(),
    dashboards: loadDashboards(),
  }

  logger.trace('loadedData =', JSON.stringify(loadedData, null, 2))
  data = loadedData
}

export const getData = () => data
