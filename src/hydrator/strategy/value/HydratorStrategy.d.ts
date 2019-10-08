import { ValueStrategyInteface } from "./ValueStrategyInteface";
import { HydratorAwareInterface } from "../../HydratorAwareInterface";
import { HydratorAware } from "../../HydratorAware";
import { HydratorInterface } from "../../HydratorInterface";
/**
 *
 */
export declare class HydratorStrategy extends HydratorAware implements ValueStrategyInteface, HydratorAwareInterface {
    /**
     * @param {HydratorInterface} hydrator
     */
    constructor(hydrator?: HydratorInterface);
    /**
     * @inheritDoc
     */
    extractValue(data: any): any[];
    /**
     * @inheritDoc
     */
    hydrateValue(property: string, data: any): any[];
}
