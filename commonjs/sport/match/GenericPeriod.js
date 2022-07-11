"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenericPeriod = void 0;
/**
 * @class GenericPeriod
 */
class GenericPeriod {
    /**
     * @param name
     */
    constructor(name) {
        this.name = name;
    }
    /**
     * @return {string}
     */
    getName() {
        return this.name;
    }
    /**
     * @param name
     * @returns
     */
    setName(name) {
        this.name = name;
        return this;
    }
}
exports.GenericPeriod = GenericPeriod;
