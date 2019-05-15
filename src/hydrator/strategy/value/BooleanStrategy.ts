import {ValueStrategyInteface} from "./ValueStrategyInteface";

/**
 *
 */
export class BooleanStrategy implements ValueStrategyInteface {

    /**
     * @param {string} property
     * @param data
     * @return {any}
     */
    hydrateValue(property: string, data: any) {


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
    extractValue(data: any) {
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