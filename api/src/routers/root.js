import express from 'express'

import { getAnnotations } from '../services/annotationsService'
import { getAvailableMetrics, getMetrics } from '../services/metricsService'

const rootHandler = (req, res) => res.end()

const annotationsHandler = (req, res) => {
  const { annotation: { query } } = req.body
  res.json(getAnnotations(query))
}

const searchHandler = (req, res) => res.json(getAvailableMetrics())

const queryHandler = (req, res) => {
  const { targets } = req.body

  if (!targets || !targets.length || !targets[0].target) {
    res.json([])
    return
  }

  res.json(getMetrics(targets))
}

const router = express.Router()
router.get('/', rootHandler) // used to test the connection
router.post('/annotations', annotationsHandler) // expose annotations
router.post('/search', searchHandler) // expose what metrics are available
router.post('/query', queryHandler) // handles the actual data query

export default router
