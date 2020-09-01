"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AutoLoadClass = void 0;
/**
 * @class
 * WebComponent
 */
class AutoLoadClass {
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
     * @param {PathNode} path
     * @return {this}
     */
    setPath(path) {
        this.path = path;
        return this;
    }
}
exports.AutoLoadClass = AutoLoadClass;
