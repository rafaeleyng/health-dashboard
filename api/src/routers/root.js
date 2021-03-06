import express from 'express'

import { getAnnotations } from '../services/annotationsService'
import { getAvailableMetrics, getMetrics } from '../services/metricsService'
import { loadData } from '../services/dataService'

const rootHandler = (req, res) => res.end()
const annotationsHandler = (req, res) => res.json(getAnnotations(req.body.annotation.query))
const queryHandler = (req, res) => res.json(getMetrics(req.body.targets, req.body.range))
const searchHandler = (req, res) => res.json(getAvailableMetrics())
const reloadDataHandler = (req, res) => {
    loadData()
    res.end()
}

const router = express.Router()
router.get('/', rootHandler) // used to test the connection
router.post('/annotations', annotationsHandler) // expose annotations
router.post('/query', queryHandler) // handles the actual data query
router.post('/search', searchHandler) // expose what metrics are available
router.get('/data/reload', reloadDataHandler)

export default router
