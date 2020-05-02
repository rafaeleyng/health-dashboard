import last from 'lodash/last'
import sortBy from 'lodash/sortBy'

import { parseDate, isInRange } from '../dateService'
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

// if they exist, adds the first metric before the filtered, and the first after,
// so the graph doesn't start and end empty
const padDatapoints = (filteredDatapoints, originalDatapoints) => {
  let result = [...filteredDatapoints]

  const firstDatapoint = filteredDatapoints[0]
  const lastDatapoint = last(filteredDatapoints)

  if (firstDatapoint !== lastDatapoint) {
    const originalIndexOfFirst = originalDatapoints.indexOf(firstDatapoint)
    const originalIndexOfLast = originalDatapoints.indexOf(lastDatapoint)

    if (originalIndexOfFirst > 0) {
      result = [originalDatapoints[originalIndexOfFirst - 1], ...result]
    }

    if (originalIndexOfLast < (originalDatapoints.length - 1)) {
      result = [...result, originalDatapoints[originalIndexOfLast + 1]]
    }
  }

  return result
}

export const getMetrics = (targets, range) => {
  if (!targets || !targets.length || !targets[0].target) {
    return []
  }

  const { metrics } = getData()

  const result = targets.reduce((acc, reqTarget) => {
    const targetName = reqTarget.target
    const targetData = metrics[targetName]

    const resTargets = targetData
      .map((data) => {
        const filteredDatapoints = data.datapoints.filter((datapoint) => isInRange(datapoint[1], range))
        if (!filteredDatapoints.length) {
          return null
        }

        const paddedDatapoints = padDatapoints(filteredDatapoints, data.datapoints)

        return { target: `${targetName} (${data.target})`, datapoints: paddedDatapoints }
      })
      .filter((data) => !!data)

    return [...acc, ...resTargets]
  }, [])

  return result
}
