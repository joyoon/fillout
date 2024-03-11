"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PageCount = void 0;
const PageCount = (responseCount, limit = 150) => {
    const pageCount = Math.ceil(responseCount / limit);
    return pageCount;
};
exports.PageCount = PageCount;
