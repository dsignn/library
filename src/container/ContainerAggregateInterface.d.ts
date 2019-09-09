import { ContainerInterface } from "./ContainerInterface";
/**
 * @interface
 * ContainerAggregateInterface
 */
export interface ContainerAggregateInterface extends ContainerInterface {
    /**
     * @return Array<any>
     */
    getAll(): Array<any>;
}
