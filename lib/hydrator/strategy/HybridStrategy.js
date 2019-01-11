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
    static get STRING_BOOLEAN() { return "boolean"};

    /**
     * @return {string}
     */
    static get STRING_NUMBER() { return "number"};

    /**
     * @return {string}
     */
    static get STRING_UNDEFINED() { return "undefined"};

    /**
     * @return {string}
     */
    static get STRING_OBJECT() { return "object"};

    /**
     * @return {string}
     */
    static get STRING_FUNCTION() { return "function"};

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

        let hydrate = data;
        // TODO ti finish

        switch (typeof data) {
            case this.hydrateType === NumberStrategy.STRING_NUMBER:
                hydrate = parseFloat(data);
                break;
        }

        return hydrate;
    }

    /**
     *
     * @param data
     * @returns {{}|*}
     */
    extractStrategy(data) {
        let extract = data;

        // TODO to finish
        switch (typeof data) {
            case this.extractType === NumberStrategy.STRING_BOOLEAN:
                extract = !!data;
                break;
        }

        return extract;
    }

    /**
     * @param typeConvert
     * @param data
     * @return {*}
     */
    convertTo(typeConvert, data) {

        let dataConvert = data;
        switch (true) {

            case typeConvert === NumberStrategy.STRING_BOOLEAN:
                dataConvert = data ? true : false;
                break;

            case typeof data === NumberStrategy.STRING_BOOLEAN:

                switch (typeConvert) {
                    case NumberStrategy.STRING_NUMBER:
                        dataConvert = data ? 1 : 0;
                        break;
                }
                break;
        }

        return dataConvert;
    }

}

module.exports = NumberStrategy;