import sortBy from 'lodash/sortBy'
import { parseDate } from '../dateService'
import { getData } from '../dataService'

export const normalizeMetrics = (metrics) => {
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

export const getAvailableMetrics = () => {
  const { metrics } = getData()
  return Object.keys(metrics)
}

export const getMetrics = (targets) => {
  const { metrics } = getData()

  // TODO filter by date
  const result = targets.reduce((acc, reqTarget) => {
    const targetName = reqTarget.target
    const targetData = metrics[targetName]

    const resTargets = targetData.map((data) => ({
      target: `${targetName} (${data.target})`,
      datapoints: data.datapoints
    }))

    return [...acc, ...resTargets]
  }, [])

  return result
}
