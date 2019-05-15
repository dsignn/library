"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 *
 */
class HydratorAware {
    /**
     * @return {HydratorInteface}
     */
    getHydrator() {
        return this.hydrator;
    }
    /**
     * @param {HydratorInteface} hydrator
     * @return {this}
     */
    setHydrator(hydrator) {
        this.hydrator = hydrator;
        return this;
    }
    ;
}
exports.HydratorAware = HydratorAware;
