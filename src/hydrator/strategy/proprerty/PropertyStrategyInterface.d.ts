/**
 *
 */
import { PropertyHydrationStrategyInterface } from "./PropertyHydrationStrategyInterface";
import { PropertyExtractStrategyInterface } from "./PropertyExtractStrategyInterface";
export interface PropertyStrategyInterface extends PropertyExtractStrategyInterface, PropertyHydrationStrategyInterface {
}
