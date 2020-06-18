import { PropertyStrategyInterface } from "./PropertyStrategyInterface";
/**
 * @class MapPropertyStrategy
 */
export declare class MapPropertyStrategy implements PropertyStrategyInterface {
    /**
     * @type {object}
     */
    private changeExtractProperty;
    /**
     * @type {null}
     */
    private changeHydrateProperty;
    /**
     * @param {string} hydrate
     * @param {string} extract
     */
    constructor(hydrate: string, extract: string);
    /**
     * @inheritDoc
     */
    extractProperty(property: string): string;
    /**
     * @inheritDoc
     */
    hydrateProperty(property: string): string;
}
