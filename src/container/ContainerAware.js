import { Container } from "./Container";
/**
 * @class
 * ContainerAware
 */
export class ContainerAware {
    constructor() {
        /**
         * @type {Container}
         */
        this.container = new Container();
    }
    /**
     * @return ContainerInterface
     */
    getContainer() {
        return this.container;
    }
    /**
     * @param {string} container
     * @return this
     */
    setContainer(container) {
        this.container = container;
        return this;
    }
}
//# sourceMappingURL=ContainerAware.js.map