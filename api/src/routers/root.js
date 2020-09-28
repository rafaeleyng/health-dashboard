import express from 'express'

import { getAnnotations } from '../services/annotationsService'
import { loadData } from '../services/dataService'
import { getAvailableMetrics, getMetrics } from '../services/metricsService'

const rootHandler = (req, res) => res.end()
const reloadHandler = (req, res) => {
    loadData()
    res.end()
}
const annotationsHandler = (req, res) => res.json(getAnnotations(req.body.annotation.query))
const queryHandler = (req, res) => res.json(getMetrics(req.body.targets, req.body.range))
const searchHandler = (req, res) => res.json(getAvailableMetrics())

const router = express.Router()
router.get('/', rootHandler) // used to test the connection
router.get('/reload', reloadHandler) // used to reload the data upon changes on the data files
router.post('/annotations', annotationsHandler) // expose annotations
router.post('/query', queryHandler) // handles the actual data query
router.post('/search', searchHandler) // expose what metrics are available

export default router
