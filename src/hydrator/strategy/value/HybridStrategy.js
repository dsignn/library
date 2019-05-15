/**
 *
 */
export class HybridStrategy {
    /**
     * @param {string} hydrateType
     * @param {string} extractType
     */
    constructor(hydrateType, extractType) {
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
    hydrateValue(property, data) {
        return this.convertTo(this.hydrateType, data);
    }
    /**
     *
     * @param data
     * @returns {*}
     */
    extractValue(data) {
        return this.convertTo(this.extractType, data);
    }
    /**
     * @param typeConvert
     * @param data
     * @return {*}
     */
    convertTo(typeConvert, data) {
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
/**
 * @return {string}
 */
HybridStrategy.STRING_TYPE = "string";
/**
 * @return {string}
 */
HybridStrategy.BOOLEAN_TYPE = "boolean";
/**
 * @return {string}
 */
HybridStrategy.NUMBER_TYPE = "number";
/**
 * @return {string}
 */
HybridStrategy.UNDEFINED_TYPE = "undefined";
/**
 * @return {string}
 */
HybridStrategy.OBJECT_TYPE = "object";
/**
 * @return {string}
 */
HybridStrategy.FUNCTION_TYPE = "function";
//# sourceMappingURL=HybridStrategy.js.map