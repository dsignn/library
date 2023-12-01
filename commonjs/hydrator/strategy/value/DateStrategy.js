"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DateStrategy = void 0;
/**
 *
 */
class DateStrategy {
    /**
     * @param {string} property
     * @param data
     * @return {any}
     */
    hydrateValue(property, data) {
        return new Date(data);
    }
    /**
     *
     * @param data
     * @returns {{}|*}
     */
    extractValue(data) {
        let extract = data;
        if (data instanceof Date) {
            extract = data.toString();
        }
        return extract;
    }
}
exports.DateStrategy = DateStrategy;
