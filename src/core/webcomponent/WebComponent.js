import { PathAware } from "../../path/PathAware";
/**
 * @class
 * WebComponent
 */
export class WebComponent extends PathAware {
    constructor() {
        super(...arguments);
        /**
         * @type {string}
         */
        this.name = null;
    }
    /**
     * @return {string}
     */
    getName() {
        return this.name;
    }
    /**
     * @param {string} name
     * @return {this}
     */
    setName(name) {
        this.name = name;
        return this;
    }
}
//# sourceMappingURL=WebComponent.js.map