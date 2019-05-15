import {HydratorInteface} from "./HydratorInteface";

export interface HydratorAwareInterface {

    /**
     * @return {HydratorInteface}
     */
    getHydrator(): HydratorInteface;

    /**
     * @param {HydratorInteface} hydrator
     * @return {this}
     */
    setHydrator(hydrator:HydratorInteface);
}