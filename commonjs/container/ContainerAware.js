"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContainerAware = void 0;
const Container_1 = require("./Container");
/**
 * @class
 * ContainerAware
 */
class ContainerAware {
    constructor() {
        /**
         * @type {Container}
         */
        this.container = new Container_1.Container();
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
exports.ContainerAware = ContainerAware;
