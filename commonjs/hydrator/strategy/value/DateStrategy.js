"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DateStrategy = void 0;
/**
 *
 */
class DateStrategy {
    /**
     * @param {} function
     */
    constructor(fn) {
        /**
         * @type {StorageAdapterInterface}
         */
        this.extractFn = fn;
    }
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
            extract = this.extractFn ? this.extractFn(data) : this.defaultExtract(data);
        }
        return extract;
    }
    defaultExtract(date) {
        if (date instanceof Date) {
            return `${date.getFullYear()}-${date.getMonth()}-${date.getDay()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
        }
        else {
            return date;
        }
    }
}
exports.DateStrategy = DateStrategy;
