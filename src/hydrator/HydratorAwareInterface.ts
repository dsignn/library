import {HydratorInterface} from "./HydratorInterface";

export interface HydratorAwareInterface {

    /**
     * @return {HydratorInterface}
     */
    getHydrator(): HydratorInterface;

    /**
     * @param {HydratorInterface} hydrator
     * @return {this}
     */
    setHydrator(hydrator:HydratorInterface);
}