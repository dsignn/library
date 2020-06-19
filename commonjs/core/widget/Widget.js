"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Widget = void 0;
/**
 * @class Widget
 * @deprecated
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
         * Name of the web component of the widget
         *
         * @type {string}
         */
        this.wc = null;
        /**
         * Name of the web component of the data injector
         *
         * @type {string}
         */
        this.wcData = null;
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
    }
    /**
     * @return {Path}
     */
    getSrcData() {
        return this.srcData;
    }
    /**
     * @return {Path}
     */
    getSrc() {
        return this.src;
    }
    /**
     * @return {string}
     */
    getName() {
        return this.name;
    }
    /**
     * @return {string}
     */
    getWc() {
        return this.wc;
    }
    /**
     * @return {string}
     */
    getWcData() {
        return this.wcData;
    }
}
exports.Widget = Widget;
