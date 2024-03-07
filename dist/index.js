"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const qs = require('qs');
const express = require('express');
const app = express();
app.get('/:formId/filteredResponses', function (req, res) {
    const token = 'sk_prod_TfMbARhdgues5AuIosvvdAC9WsA5kXiZlW8HZPaRDlIbCpSpLsXBeZO7dCVZQwHAY3P4VSBPiiC33poZ1tdUj2ljOzdTCCOSpUZ_3912';
    const header = `Authorization: Bearer ${token}`;
    const apiBase = 'https://api.fillout.com/v1/api/forms';
    const fakeFilters = [
        { id: 'nameId', condition: 'equals', value: 'Timmy' },
        { id: 'dateId', condition: 'less_than', value: '2024-02-23T05:01:47.691Z' }
    ];
    // console.log(JSON.stringify(fakeFilters))
    const formId = req.params.formId;
    const limit = req.query.limit || undefined;
    const afterDate = req.query.afterDate || undefined;
    const beforeDate = req.query.beforeDate || undefined;
    const offset = req.query.offset || undefined;
    const status = req.query.status || undefined;
    const includeEditLink = req.query.includeEditLink || undefined;
    const sort = req.query.sort || undefined;
    const filters = req.query.filters || undefined;
    const filtersParsed = filters && filters.length ? JSON.parse(filters) : undefined;
    const queryString = qs.stringify({
        limit: limit,
        afterDate: afterDate,
        beforeDate: beforeDate,
        offset: offset,
        status: status,
        includeEditLink: includeEditLink,
        sort: sort
    });
    axios_1.default.get(`${apiBase}/${formId}/submissions?${qs}`, { headers: { "Authorization": header } })
        .then((res) => {
        console.log(JSON.stringify(res.data));
        const responses = res.data;
        // filter
        if (filtersParsed) {
            // console.log(filtersParsed)
            let isFiltered = false;
            const submissionIds = [];
            // iterate responses
            // 
        }
    });
});
app.listen(3000);
