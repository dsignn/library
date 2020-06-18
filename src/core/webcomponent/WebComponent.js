/**
 * @class
 * WebComponent
 */
export class WebComponent {
    constructor() {
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
    /**
     * @return {PathInterface}
     */
    getPath() {
        return this.path;
    }
    /**
     * @param {Path} path
     * @return {this}
     */
    setPath(path) {
        this.path = path;
        return this;
    }
}
//# sourceMappingURL=WebComponent.js.map