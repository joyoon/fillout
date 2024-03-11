import axios from 'axios'
const qs = require('qs')
const express = require('express')
const dotenv = require('dotenv')
import { FilterClauseType } from './FilterClauseType.js'
import { FilterResponses, GetResponseFilters } from './ResponseFilter.js'
import { Question } from './Question.js'
import { ResponseFilter } from './ResponseFiltersType.js'
import { PageCount } from './PageCount.js'

dotenv.config()
const app = express()

app.get('/:formId/filteredResponses', (req: any, res: any) => {
  const formId = req.params.formId
  const limit = req.query.limit || undefined
  const afterDate = req.query.afterDate || undefined
  const beforeDate = req.query.beforeDate || undefined
  const offset = req.query.offset || undefined
  const status = req.query.status || undefined
  const includeEditLink = req.query.includeEditLink || undefined
  const sort = req.query.sort || undefined
  const filters = req.query.filters || undefined
  const filtersParsed: FilterClauseType[] = filters && filters.length ? JSON.parse(filters) : []

  const queryString = qs.stringify({
    limit: limit,
    afterDate: afterDate,
    beforeDate: beforeDate,
    offset: offset,
    status: status,
    includeEditLink: includeEditLink,
    sort: sort
  })

    const token = process.env.API_KEY
    const header = `Authorization: Bearer ${token}`
    const apiBase = process.env.API_BASE

    axios.get(`${apiBase}/${formId}/submissions?${queryString}`, { headers: { "Authorization": header } })
      .then((resp: any) => {

        const responses = resp.data.responses
        const responseFilters: ResponseFilter[] = filtersParsed.length ? GetResponseFilters(filtersParsed) : []

        const filteredResponses = responseFilters.length ? FilterResponses(responses, responseFilters) : responses
        const pageCount = limit ? PageCount(filteredResponses.length, limit) : PageCount(filteredResponses.length)

        res.send({ responses: filteredResponses, totalResponses: filteredResponses.length, pageCount: pageCount })
  })
})

app.listen(3000)