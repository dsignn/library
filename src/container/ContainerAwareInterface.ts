import {ContainerInterface} from "./ContainerInterface";

/**
 * @interface
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

