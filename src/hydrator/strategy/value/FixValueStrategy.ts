import {ValueStrategyInteface} from "./ValueStrategyInteface";

/**
 *
 */
export class FixValueStrategy implements ValueStrategyInteface {

    /**
     *
     */
    private fixValue: any;

    /**
     * @param fixValue
     */
    constructor(fixValue) {
        this.fixValue = fixValue;
    }

    /**
     * @inheritDoc
     */
    extractValue(data: any) {
        return this.fixValue;
    }

    /**
     * @inheritDoc
     */
    hydrateValue(property: string, data: any) {
        return this.fixValue;
    }
}
