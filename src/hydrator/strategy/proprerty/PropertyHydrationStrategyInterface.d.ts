/**
 *
 */
export interface PropertyHydrationStrategyInterface {
    /**
     * @param {string} property
     */
    hydrateProperty(property: string): any;
}
