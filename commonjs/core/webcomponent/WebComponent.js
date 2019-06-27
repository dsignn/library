"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Path_1 = require("../../path/Path");
/**
 *
 */
class WebComponent {
    constructor() {
        /**
         * @type {string}
         */
        this.name = null;
        /**
         * @type {Path}
         */
        this.path = new Path_1.Path();
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
exports.WebComponent = WebComponent;
