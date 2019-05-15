import {ContainerAwareInterface} from "./ContainerAwareInterface";
import {ContainerInterface} from "./ContainerInterface";
import {Container} from "./Container";
/**
 * ContainerAwareInterface
 */
export class ContainerAware implements ContainerAwareInterface {

    /**
     * @type {Container}
     */
    protected container: ContainerInterface = new Container();

    /**
     * @return ContainerInterface
     */
    public getContainer() {
        return this.container;
    }

    /**
     * @param {string} container
     * @return this
     */
    public setContainer(container:ContainerInterface) {
        this.container = container;
        return this;
    }
}

