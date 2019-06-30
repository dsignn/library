"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HydratorAware_1 = require("../../HydratorAware");
/**
 *
 */
class HydratorStrategy extends HydratorAware_1.HydratorAware {
    /**
     * @param {HydratorInteface} hydrator
     */
    constructor(hydrator) {
        super();
        this.hydrator = hydrator;
    }
    /**
     * @inheritDoc
     */
    extractValue(data) {
        let extract = [];
        if (Array.isArray(data)) {
            for (let cont = 0; data.length > cont; cont++) {
                extract[cont] = this.getHydrator().extract(data[cont]);
            }
        }
        else {
            extract = this.getHydrator().extract(data);
        }
        return extract;
    }
    /**
     * @inheritDoc
     */
    hydrateValue(property, data) {
        let hydrate = [];
        if (Array.isArray(data)) {
            for (let cont = 0; data.length > cont; cont++) {
                hydrate[cont] = this.getHydrator().hydrate(data[cont]);
            }
        }
        else {
            hydrate = this.getHydrator().hydrate(data);
        }
        return hydrate;
    }
}
exports.HydratorStrategy = HydratorStrategy;
