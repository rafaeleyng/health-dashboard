import fs from 'fs'
import path from 'path'
import requireDir from 'require-dir'
import ms from 'ms'
import cloneDeep from 'lodash/cloneDeep'
import flatMap from 'lodash/flatMap'
import sortBy from 'lodash/sortBy'

import { parseDate } from '../dateService'
import { normalizeAnnotations } from '../annotationsService'

import { getLogger } from '../../logger'

const logger = getLogger('dataService')
let data = {}

const dataFolderPath = path.resolve(process.env.API_DATA_PATH || '/usr/data/git/health-data')

const loadAnnotations = () => {
  let annotations = cloneDeep(require(path.resolve(dataFolderPath, 'annotations.js')))

  // compatibility with `esm`
  if (annotations.default) {
    annotations = annotations.default
  }

  return normalizeAnnotations(annotations)
}

const normalizeMetrics = (metrics) => {
  for (const metricTargets of Object.values(metrics)) {
    metricTargets.forEach((metric) => {
      metric.datapoints.forEach((datapoint) => {
        const date = datapoint[0]
        const measurement = datapoint[1]
        datapoint[0] = measurement
        datapoint[1] = parseDate(date)
      })

      metric.datapoints = sortBy(metric.datapoints, '1')
    })
  }
  return metrics
}

const loadMetrics = () => {
  const nestedMetrics = cloneDeep(requireDir(path.resolve(dataFolderPath, 'metrics'), { recurse: true, noCache: true }))

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
  const dashboards = cloneDeep(requireDir(path.resolve(dataFolderPath, 'dashboards')))

  Object.entries(dashboards).forEach(([key, value]) => {
    // compatibility with `esm`
    if (value.default) {
      dashboards[key] = value.default
    }
  })

  return dashboards
}

export const loadData = () => {
  logger.info(`loading data from ${dataFolderPath}`)

  if (!fs.existsSync(dataFolderPath)) {
    logger.info(`data folder ${dataFolderPath} not found`)
    return
  }

  const loadedData = {
    annotations: loadAnnotations(),
    metrics: loadMetrics(),
    dashboards: loadDashboards(),
  }

  logger.trace('loadedData =', JSON.stringify(loadedData, null, 2))
  data = loadedData
}

export const watchLoadData = () => {
  loadData()
  setTimeout(() => {
    watchLoadData()
  }, ms('1m'))
}

export const getData = () => cloneDeep(data)
