"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebComponent = void 0;
const PathAware_1 = require("../../path/PathAware");
/**
 * @class
 * WebComponent
 */
class WebComponent extends PathAware_1.PathAware {
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
exports.WebComponent = WebComponent;
