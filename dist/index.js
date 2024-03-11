"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const qs = require('qs');
const express = require('express');
const dotenv = require('dotenv');
const ResponseFilter_js_1 = require("./ResponseFilter.js");
const PageCount_js_1 = require("./PageCount.js");
dotenv.config();
const app = express();
app.get('/:formId/filteredResponses', (req, res) => {
    const formId = req.params.formId;
    const limit = req.query.limit || undefined;
    const afterDate = req.query.afterDate || undefined;
    const beforeDate = req.query.beforeDate || undefined;
    const offset = req.query.offset || undefined;
    const status = req.query.status || undefined;
    const includeEditLink = req.query.includeEditLink || undefined;
    const sort = req.query.sort || undefined;
    const filters = req.query.filters || undefined;
    const filtersParsed = filters && filters.length ? JSON.parse(filters) : [];
    const queryString = qs.stringify({
        limit: limit,
        afterDate: afterDate,
        beforeDate: beforeDate,
        offset: offset,
        status: status,
        includeEditLink: includeEditLink,
        sort: sort
    });
    const token = process.env.API_KEY;
    const header = `Authorization: Bearer ${token}`;
    const apiBase = process.env.API_BASE;
    axios_1.default.get(`${apiBase}/${formId}/submissions?${queryString}`, { headers: { "Authorization": header } })
        .then((resp) => {
        const responses = resp.data.responses;
        const responseFilters = filtersParsed.length ? (0, ResponseFilter_js_1.GetResponseFilters)(filtersParsed) : [];
        let filteredResponses = responseFilters.length ? (0, ResponseFilter_js_1.FilterResponses)(responses, responseFilters) : responses;
        filteredResponses = [{ "submissionId": "ab9959b2-73e8-4994-85b9-56e780b89ce3",
                "submissionTime": "2024-02-27T19:37:08.228Z" }, { "submissionId": "ab9959b2-73e8-4994-85b9-56e780b89ce3",
                "submissionTime": "2024-02-27T19:37:08.228Z" }, { "submissionId": "ab9959b2-73e8-4994-85b9-56e780b89ce3",
                "submissionTime": "2024-02-27T19:37:08.228Z" }, { "submissionId": "ab9959b2-73e8-4994-85b9-56e780b89ce3",
                "submissionTime": "2024-02-27T19:37:08.228Z" }];
        const pageCount = limit ? (0, PageCount_js_1.PageCount)(filteredResponses.length, limit) : (0, PageCount_js_1.PageCount)(filteredResponses.length);
        res.send({ responses: filteredResponses, totalResponses: filteredResponses.length, pageCount: pageCount });
    });
});
app.listen(3000);
