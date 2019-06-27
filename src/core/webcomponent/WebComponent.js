import { Path } from "../../path/Path";
/**
 *
 */
export class WebComponent {
    constructor() {
        /**
         * @type {string}
         */
        this.name = null;
        /**
         * @type {Path}
         */
        this.path = new Path();
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
     * @return {Path}
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