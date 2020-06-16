import {PropertyStrategyInterface} from "./PropertyStrategyInterface";
/**
 *
 */
export class MapPropertyStrategy implements PropertyStrategyInterface {

    /**
     * @type {object}
     */
    private changeExtractProperty: string = null;

    /**
     * @type {null}
     */
    private changeHydrateProperty: string = null;

    /**
     * @param {string} hydrate
     * @param {string} extract
     */
    constructor(hydrate: string, extract: string) {

        this.changeHydrateProperty = hydrate;
        this.changeExtractProperty = extract;
    }

    /**
     * @inheritDoc
     */
    extractProperty(property: string) {
        return this.changeExtractProperty ? this.changeExtractProperty : property;
    }

    /**
     * @inheritDoc
     */
    hydrateProperty(property: string) {
        return this.changeHydrateProperty ? this.changeHydrateProperty : property;
    }
}
