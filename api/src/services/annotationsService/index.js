import sortBy from 'lodash/sortBy'
import { parseDate } from '../dateService'
import { getData } from '../dataService'

export const normalizeAnnotations = (annotations) => {
  annotations.forEach((annotation) => {
    annotation.time = parseDate(annotation.time)
    if (annotation.timeEnd) {
      annotation.timeEnd = parseDate(annotation.timeEnd)
    }
  })

  return sortBy(annotations, ['time', 'timeEnd'])
}

export const getAnnotations = (query) => {
  const { annotations } = getData()
  return annotations.filter((annotation) => annotation.tags.includes(query))
}
