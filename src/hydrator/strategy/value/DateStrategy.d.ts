import { ValueStrategyInteface } from "./ValueStrategyInteface";
/**
 *
 */
export declare class DateStrategy implements ValueStrategyInteface {
    /**
     * @param {string} property
     * @param data
     * @return {any}
     */
    hydrateValue(property: string, data: any): Date;
    /**
     *
     * @param data
     * @returns {{}|*}
     */
    extractValue(data: any): any;
}
