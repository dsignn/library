import { ValueHydrationStrategyInterface } from "./ValueHydrationStrategyInterface";
import { ValueExtractStrategyInterface } from "./ValueExtractStrategyInterface";
/**
 *
 */
export interface ValueStrategyInteface extends ValueExtractStrategyInterface, ValueHydrationStrategyInterface {
}
