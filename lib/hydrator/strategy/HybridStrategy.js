/**
 *
 */
class NumberStrategy {

    /**
     * @return {string}
     */
    static get STRING_TYPE() { return "string"};

    /**
     * @return {string}
     */
    static get BOOLEAN_TYPE() { return "boolean"};

    /**
     * @return {string}
     */
    static get NUMBER_TYPE() { return "number"};

    /**
     * @return {string}
     */
    static get UNDEFINED_TYPE() { return "undefined"};

    /**
     * @return {string}
     */
    static get OBJECT_TYPE() { return "object"};

    /**
     * @return {string}
     */
    static get FUNCTION_TYPE() { return "function"};

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
     *
     * @param data
     * @returns {*}
     */
    hydrateStrategy(data) {

        return this.convertTo(this.hydrateType, data);
    }

    /**
     *
     * @param data
     * @returns {{}|*}
     */
    extractStrategy(data) {
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

            case typeConvert === NumberStrategy.BOOLEAN_TYPE:
                dataConvert = data ? true : false;
                break;

            case typeof data === NumberStrategy.BOOLEAN_TYPE:

                switch (typeConvert) {
                    case NumberStrategy.NUMBER_TYPE:
                        dataConvert = data ? 1 : 0;
                        break;
                }
                break;
        }

        return dataConvert;
    }

}

module.exports = NumberStrategy;