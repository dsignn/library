"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HydratorAware = void 0;
/**
 *
 */
class HydratorAware {
    /**
     * @return {HydratorInterface}
     */
    getHydrator() {
        return this.hydrator;
    }
    /**
     * @param {HydratorInterface} hydrator
     * @return {this}
     */
    setHydrator(hydrator) {
        this.hydrator = hydrator;
        return this;
    }
    ;
}
exports.HydratorAware = HydratorAware;
