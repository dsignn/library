/**
 *
 */
class BooleanStrategy {

    /**
     *
     * @param data
     * @returns {*}
     */
    hydrateStrategy(data) {

        let hydrate = data;

        switch (typeof data) {
            case 'string':
                hydrate = data.length > 0 ? true : false;
                break;
            case 'number':
                hydrate = data > 0 ? true : false;
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

        switch (typeof data) {
            case 'string':
                extract = data.length > 0 ? true : false;
                break;
            case 'number':
                extract = data > 0 ? true : false;
                break;
        }

        return extract;
    }

}

module.exports = BooleanStrategy;