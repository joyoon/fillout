"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsMatch = exports.GetResponseFilters = exports.FilterResponses = void 0;
const ResponseFilterFactory_1 = require("./ResponseFilterFactory");
const GetResponseFilters = (filterClauses) => {
    const responseFilters = filterClauses.map((filterClause) => { return (0, ResponseFilterFactory_1.ResponseFilterFactory)(filterClause); });
    return responseFilters;
};
exports.GetResponseFilters = GetResponseFilters;
const FilterResponses = (responses, responseFilters) => {
    console.log('filterresponses start');
    return responses.filter((response) => {
        return !IsResponseFiltered(response, responseFilters);
    });
};
exports.FilterResponses = FilterResponses;
const IsResponseFiltered = (response, responseFilters) => {
    console.log(`isresponsefiltered starting`);
    console.log(`submissionId ${response.submissionId}`);
    const isResponseFiltered = responseFilters.some((filter) => {
        return !filter(response.questions);
    });
    console.log(`isResponseFiltered ${isResponseFiltered}`);
    return isResponseFiltered;
};
const IsMatch = (filterFunction) => {
    return (targetQuestionId) => {
        return (targetValue) => {
            return (questions) => {
                return questions.some((question) => {
                    console.log('IsMatch running');
                    console.log(`targetQuestionId ${targetQuestionId} question.id ${question.id} targetValue ${targetValue} question.value ${question.value}) ${targetQuestionId === question.id && filterFunction(targetValue, question.value)}`);
                    return targetQuestionId === question.id && filterFunction(targetValue, question.value);
                });
            };
        };
    };
};
exports.IsMatch = IsMatch;
