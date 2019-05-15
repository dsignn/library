import {ValueStrategyInteface} from "./ValueStrategyInteface";

/**
 *
 */
export class NumberStrategy implements ValueStrategyInteface {

    /**
     * @param {string} property
     * @param data
     * @return {any}
     */
    hydrateValue(property: string, data: any) {


        let hydrate = data;

        switch (typeof data) {
            case 'string':
                hydrate = parseFloat(data);
                break;
            case 'boolean':
                hydrate = data ? 1 : 0;
                break;
        }

        return hydrate;
    }

    /**
     *
     * @param data
     * @returns {{}|*}
     */
    extractValue(data: any) {
        let extract = data;

        switch (typeof data) {
            case 'string':
                extract = parseFloat(data);
                break;
            case 'boolean':
                extract = data ? 1 : 0;
                break;
        }

        return extract;
    }
}