"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebComponent = void 0;
/**
 * @class
 * WebComponent
 */
class WebComponent {
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
exports.WebComponent = WebComponent;
