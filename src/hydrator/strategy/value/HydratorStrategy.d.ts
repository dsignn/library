import { ValueStrategyInteface } from "./ValueStrategyInteface";
import { HydratorAwareInterface } from "../../HydratorAwareInterface";
import { HydratorAware } from "../../HydratorAware";
import { HydratorInteface } from "../../HydratorInteface";
/**
 *
 */
export declare class HydratorStrategy extends HydratorAware implements ValueStrategyInteface, HydratorAwareInterface {
    /**
     * @param {HydratorInteface} hydrator
     */
    constructor(hydrator?: HydratorInteface);
    /**
     * @inheritDoc
     */
    extractValue(data: any): any[];
    /**
     * @inheritDoc
     */
    hydrateValue(property: string, data: any): any[];
}
