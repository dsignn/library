"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FixValueStrategy = void 0;
/**
 *
 */
class FixValueStrategy {
    /**
     * @param fixValue
     */
    constructor(fixValue) {
        this.fixValue = fixValue;
    }
    /**
     * @inheritDoc
     */
    extractValue(data) {
        return this.fixValue;
    }
    /**
     * @inheritDoc
     */
    hydrateValue(property, data) {
        return this.fixValue;
    }
}
exports.FixValueStrategy = FixValueStrategy;
