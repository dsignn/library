import {ContainerInterface} from "./ContainerInterface";
/**
 * ContainerAwareInterface
 */
export interface ContainerAwareInterface {

    /**
     * @return ContainerInterface
     */
    getContainer();

    /**
     * @param {string} container
     * @return this
     */
    setContainer(container:ContainerInterface);
}

