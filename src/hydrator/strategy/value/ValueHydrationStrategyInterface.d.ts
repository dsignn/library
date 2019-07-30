/**
 *
 */
export interface ValueHydrationStrategyInterface {
    /**
     * @param property
     * @param data
     */
    hydrateValue(property: string, data: any): any;
}
