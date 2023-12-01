import {ValueStrategyInteface} from "./ValueStrategyInteface";

/**
 *
 */
export class DateStrategy implements ValueStrategyInteface {

    protected extractFn: any;

    /**
     * @param {} function
     */
    constructor(fn: any) {
        /**
         * @type {StorageAdapterInterface}
         */
        this.extractFn = fn;
    }
    

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
            extract = this.extractFn ? this.extractFn(data) : this.defaultExtract(data);
        }

        return extract;
    }

    defaultExtract(date: Date) {

        if ( date instanceof Date) {
            return `${date.getFullYear()}-${date.getMonth()}-${date.getDay()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
        } else {
            return date;
        }
    }
}