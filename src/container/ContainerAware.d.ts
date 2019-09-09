import { ContainerAwareInterface } from "./ContainerAwareInterface";
import { ContainerInterface } from "./ContainerInterface";
/**
 * @class
 * ContainerAware
 */
export declare class ContainerAware implements ContainerAwareInterface {
    /**
     * @type {Container}
     */
    protected container: ContainerInterface;
    /**
     * @return ContainerInterface
     */
    getContainer(): ContainerInterface;
    /**
     * @param {string} container
     * @return this
     */
    setContainer(container: ContainerInterface): this;
}
