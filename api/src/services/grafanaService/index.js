import axios from 'axios'

import { getData } from '../dataService'

import { getLogger } from '../../logger'

const logger = getLogger('grafanaService')

const GRAFANA_HOST = 'http://admin:admin@grafana:3000' || process.ENV.GRAFANA_HOST

const setupDatasource = () => axios.post(`${GRAFANA_HOST}/api/datasources`, {
    access: 'proxy',
    isDefault: true,
    name: 'JSON API',
    type: 'simpod-json-datasource',
    url: 'http://api:4000'
})

const setupDashboards = () => {
    const { dashboards } = getData()
    return Promise.all(Object.entries(dashboards).map(([key, value]) => axios.post(`${GRAFANA_HOST}/api/dashboards/db`, value)))
}

const setupGrafana = async () => {
    logger.debug('setupGrafana started')

    try {
        await setupDatasource()
        logger.debug('setupDatasource OK')
    } catch (err) {
        if (err.response.status !== 409) {
            logger.error('setupDatasource error', err)
        }
    }

    try {
        await setupDashboards()
        logger.debug('setupDashboards OK')
    } catch (err) {
        logger.error('setupDashboards error', err)
    }

    logger.debug('setupGrafana finished')
}

export const ensureGrafanaSetup = async () => {
    // await setupGrafana()
    setInterval(async () => {
        await setupGrafana()
    }, 60 * 1000)
}
