import { ContainerInterface } from "./ContainerInterface";
/**
 * ContainerAwareInterface
 */
export interface ContainerAwareInterface {
    /**
     * @return ContainerInterface
     */
    getContainer(): any;
    /**
     * @param {string} container
     * @return this
     */
    setContainer(container: ContainerInterface): any;
}
