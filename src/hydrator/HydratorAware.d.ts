import { HydratorInteface } from "./HydratorInteface";
/**
 *
 */
export declare class HydratorAware {
    /**
     * @type HydratorInteface;
     */
    protected hydrator: HydratorInteface;
    /**
     * @return {HydratorInteface}
     */
    getHydrator(): HydratorInteface;
    /**
     * @param {HydratorInteface} hydrator
     * @return {this}
     */
    setHydrator(hydrator: HydratorInteface): this;
}
