"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 *
 */
class MapProprertyStrategy {
    constructor() {
        /**
         * @type {object}
         */
        this.changeExtractProperty = null;
        /**
         * @type {null}
         */
        this.changeHydrateProperty = null;
    }
    /**
     * @inheritDoc
     */
    extractProperty(property) {
        return this.changeExtractProperty ? this.changeExtractProperty : property;
    }
    /**
     * @inheritDoc
     */
    hydrateProperty(property) {
        return this.changeHydrateProperty ? this.changeHydrateProperty : property;
    }
}
exports.MapProprertyStrategy = MapProprertyStrategy;
