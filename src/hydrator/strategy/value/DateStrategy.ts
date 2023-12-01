import {ValueStrategyInteface} from "./ValueStrategyInteface";

/**
 *
 */
export class DateStrategy implements ValueStrategyInteface {

    /**
     * @param {string} property
     * @param data
     * @return {any}
     */
    hydrateValue(property: string, data: any) {

        return new Date(data);
    }

    /**
     *
     * @param data
     * @returns {{}|*}
     */
    extractValue(data: any) {
        let extract = data;

        if ( data instanceof Date) {
            extract = data.toString();
        }

        return extract;
    }
}