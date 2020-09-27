import log4js from 'log4js'

export const getLogger = (category) => log4js.getLogger(category)

export const configureLogger = () => {
  // possible values are (from log4js): all, trace, debug, info, warn, error, fatal, mark, off
  const level = process.env.API_LOG_LEVEL || 'info'

  log4js.configure({
    appenders: {
      out: {
        type: 'stdout',
        layout: {
          type: 'pattern', pattern: '%[%d %p %c%] - %m'
        }
      }
    },
    categories: {
      default: { appenders: ['out'], level, enableCallStack: true }
    }
  })
}
