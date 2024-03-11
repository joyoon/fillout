"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseFilterFactory = void 0;
const DoesNotEqual_1 = require("./FilterFunctions/DoesNotEqual");
const Equals_1 = require("./FilterFunctions/Equals");
const GreaterThan_1 = require("./FilterFunctions/GreaterThan");
const LessThan_1 = require("./FilterFunctions/LessThan");
const ResponseFilter_1 = require("./ResponseFilter");
const ResponseFilterFactory = (filterClause) => {
    switch (filterClause.condition) {
        case 'equals':
            return (0, ResponseFilter_1.IsMatch)(Equals_1.Equals)(filterClause.id)(filterClause.value);
        case 'does_not_equal':
            return (0, ResponseFilter_1.IsMatch)(DoesNotEqual_1.DoesNotEqual)(filterClause.id)(filterClause.value);
        case 'greater_than':
            return (0, ResponseFilter_1.IsMatch)(GreaterThan_1.GreaterThan)(filterClause.id)(filterClause.value);
        case 'less_than':
            return (0, ResponseFilter_1.IsMatch)(LessThan_1.LessThan)(filterClause.id)(filterClause.value);
    }
};
exports.ResponseFilterFactory = ResponseFilterFactory;
