/**
 *
 */
export class HydratorAware {
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
//# sourceMappingURL=HydratorAware.js.map