import { ValueStrategyInteface } from "./ValueStrategyInteface";
/**
 *
 */
export declare class BooleanStrategy implements ValueStrategyInteface {
    /**
     * @param {string} property
     * @param data
     * @return {any}
     */
    hydrateValue(property: string, data: any): any;
    /**
     *
     * @param data
     * @returns {{}|*}
     */
    extractValue(data: any): any;
}
