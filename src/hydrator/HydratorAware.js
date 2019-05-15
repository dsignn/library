/**
 *
 */
export class HydratorAware {
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
//# sourceMappingURL=HydratorAware.js.map