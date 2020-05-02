import moment from 'moment'
import isString from 'lodash/isString'

export const parseDate = (date) => isString(date) ? moment(date).valueOf() : date

export const isInRange = (timestamp, { from, to }) => timestamp >= new Date(from).valueOf() && timestamp <= new Date(to).valueOf()
