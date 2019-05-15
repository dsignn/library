import {ValueStrategyInteface} from "./ValueStrategyInteface";
/**
 *
 */
export class HybridStrategy implements ValueStrategyInteface {

    /**
     * @return {string}
     */
    public static STRING_TYPE = "string";

    /**
     * @return {string}
     */
    public static BOOLEAN_TYPE = "boolean";

    /**
     * @return {string}
     */
    public static NUMBER_TYPE = "number";

    /**
     * @return {string}
     */
    public static UNDEFINED_TYPE = "undefined";

    /**
     * @return {string}
     */
    public static OBJECT_TYPE = "object";

    /**
     * @return {string}
     */
    public static FUNCTION_TYPE = "function";

    /**
     * @type string
     */
    protected hydrateType: string;

    /**
     * @type string
     */
    protected extractType: string;

    /**
     * @param {string} hydrateType
     * @param {string} extractType
     */
    constructor(hydrateType: string, extractType: string) {

        /**
         * @type {string}
         */
        this.hydrateType = hydrateType;

        /**
         * @type {string}
         */
        this.extractType = extractType;
    }

    /**
     * @param {string} property
     * @param data
     * @return {any}
     */
    hydrateValue(property: string, data: any) {

        return this.convertTo(this.hydrateType, data);
    }

    /**
     *
     * @param data
     * @returns {*}
     */
    extractValue(data: any) {
        return this.convertTo(this.extractType, data);
    }

    /**
     * @param typeConvert
     * @param data
     * @return {*}
     */
    convertTo(typeConvert: string, data: any) {

        let dataConvert = data;
        switch (true) {

            case typeof data === HybridStrategy.BOOLEAN_TYPE:

                switch (typeConvert) {
                    case HybridStrategy.NUMBER_TYPE:
                        dataConvert = data ? 1 : 0;
                        break;
                }
                break;

            case typeof data === HybridStrategy.STRING_TYPE:
                switch (typeConvert) {
                    case HybridStrategy.BOOLEAN_TYPE:
                        dataConvert = data.length > 0 ? true : false;
                        break;
                    case HybridStrategy.NUMBER_TYPE:
                        dataConvert = data > 0 ? true : false;
                        break;
                }
                break;

            case typeof data === HybridStrategy.NUMBER_TYPE:

                switch (typeConvert) {
                    case HybridStrategy.BOOLEAN_TYPE:
                        dataConvert = data > 0 ? true : false;
                        break;
                }
                break;
        }

        return dataConvert;
    }

}