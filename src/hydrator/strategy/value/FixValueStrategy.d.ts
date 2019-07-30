import { ValueStrategyInteface } from "./ValueStrategyInteface";
/**
 *
 */
export declare class FixValueStrategy implements ValueStrategyInteface {
    /**
     *
     */
    private fixValue;
    /**
     * @param fixValue
     */
    constructor(fixValue: any);
    /**
     * @inheritDoc
     */
    extractValue(data: any): any;
    /**
     * @inheritDoc
     */
    hydrateValue(property: string, data: any): any;
}
