import axios from 'axios'

import { getData } from '../dataService'

import { getLogger } from '../../logger'

const logger = getLogger('grafanaService')

const GRAFANA_HOST = 'http://admin:admin@grafana:3000' || process.ENV.GRAFANA_HOST

const setupDatasource = async () => {
    try {
        await axios.post(`${GRAFANA_HOST}/api/datasources`, {
            access: 'proxy',
            isDefault: true,
            name: 'JSON API',
            type: 'simpod-json-datasource',
            url: 'http://api:4000'
        })

        logger.info('setupDatasource OK')
    } catch (err) {
        if (!err.isAxiosError) {
            logger.error('setupDatasource error', err)
            return
        }

        if (!err.response) {
            logger.error('setupDatasource no response axios error', err.message)
            return
        }

        if (err.response.status !== 409) {
            logger.error('setupDatasource HTTP response error', err.response.status, err.message)
        }
    }
}

const setupDashboards = async () => {
    const { dashboards } = getData()
    if (!dashboards) {
        return undefined
    }

    try {
        const promises = Object.entries(dashboards).map(([key, value]) => axios.post(`${GRAFANA_HOST}/api/dashboards/db`, value))
        await Promise.all(promises)
        logger.info('setupDashboards OK')
    } catch (err) {
        if (!err.isAxiosError) {
            logger.error('setupDashboards error', err)
            return
        }

        if (!err.response) {
            logger.error('setupDashboards no response axios error', err.message)
            return
        }

        logger.error('setupDashboards HTTP response error', err.response.status, err.message)
    }
}

const setupGrafana = async () => {
    logger.info('setupGrafana started')
    await setupDatasource()
    await setupDashboards()
    logger.info('setupGrafana finished')
}

export const watchGrafanaSetup = () => {
    setupGrafana()
    setInterval(setupGrafana, 30 * 1000)
}
