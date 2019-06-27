/**
 *
 */
export class FixValueStrategy {
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
//# sourceMappingURL=FixValueStrategy.js.map