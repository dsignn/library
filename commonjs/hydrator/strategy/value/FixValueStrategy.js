"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
