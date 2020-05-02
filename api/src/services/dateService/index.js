import moment from 'moment'
import isString from 'lodash/isString'

export const parseDate = (date) => {
  if (isString(date)) {
    return moment(date).valueOf()
  }
  return date
}
