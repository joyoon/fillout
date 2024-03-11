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
    return responses.filter((response) => {
        return !IsResponseFiltered(response, responseFilters);
    });
};
exports.FilterResponses = FilterResponses;
const IsResponseFiltered = (response, responseFilters) => {
    const isResponseFiltered = responseFilters.some((filter) => {
        return !filter(response.questions);
    });
    return isResponseFiltered;
};
const IsMatch = (filterFunction) => {
    return (targetQuestionId) => {
        return (targetValue) => {
            return (questions) => {
                return questions.some((question) => {
                    return targetQuestionId === question.id && filterFunction(targetValue, question.value);
                });
            };
        };
    };
};
exports.IsMatch = IsMatch;
