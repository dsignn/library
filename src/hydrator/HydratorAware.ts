import {HydratorInteface} from "./HydratorInteface";

/**
 *
 */
export class HydratorAware {

    /**
     * @type HydratorInteface;
     */
    protected hydrator: HydratorInteface;

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
    setHydrator(hydrator: HydratorInteface) {
        this.hydrator = hydrator;
        return this;
    };
}