/**
 * ContainerInterface
 */
import {ContainerInterface} from "./ContainerInterface";

export interface ContainerAggregateInterface extends ContainerInterface{

    /**
     * @return Array<any>
     */
    getAll(): Array<any>;

}

