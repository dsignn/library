/**
 *
 */
export interface HydrationInterface {
    /**
     * @param data
     * @param {object} object
     */
    hydrate(data: any, object?: object): any;
}
