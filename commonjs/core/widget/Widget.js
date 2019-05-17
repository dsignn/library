"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Path_1 = require("../../path/Path");
/**
 *  Widget
 */
class Widget {
    constructor() {
        /**
         * @type {string}
         */
        this.name = null;
        /**
         * @type {string}
         */
        this.description = null;
        /**
         * @type {string}
         */
        this.wc = null;
        /**
         * @type {string}
         */
        this.dataProperty = null;
        /**
         * @type {string}
         */
        this.dataLabel = null;
        /**
         * @type {string}
         */
        this.dataRequired = false;
        /**
         * @type {Path}
         */
        this.path = new Path_1.Path();
    }
    /**
     * @return {string}
     */
    getWc() {
        return this.wc;
    }
}
exports.Widget = Widget;
