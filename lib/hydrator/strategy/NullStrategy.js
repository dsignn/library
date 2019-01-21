/**
 *
 */
class NullStrategy {

    /**
     *
     * @param data
     * @returns {*}
     */
    hydrateStrategy(data) {

        let hydrate = data;

        switch (typeof data) {
            case 'string':
                hydrate = data.length > 0 ? data : null;
                break;
            case 'number':
                hydrate = data > 0 ? data : null;
                break;
            case 'boolean':
                hydrate = data ? data : null;
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
                extract = data.length > 0 ? data : null;
                break;
            case 'number':
                extract = data > 0 ? data : null;
                break;
            case 'boolean':
                hydrate = data ? data : null;
                break;
        }

        return extract;
    }

}

module.exports = NullStrategy;