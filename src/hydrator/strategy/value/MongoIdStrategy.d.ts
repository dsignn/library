import { ValueStrategyInteface } from "./ValueStrategyInteface";
/**
 *
 */
export declare class MongoIdStrategy implements ValueStrategyInteface {
    /**
     * @inheritDoc
     */
    extractValue(data: any): any;
    /**
     * @inheritDoc
     */
    hydrateValue(property: string, data: any): any;
}
