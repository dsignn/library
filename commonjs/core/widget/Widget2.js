"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Widget2 = void 0;
/**
 * @class
 * Widget
 */
class Widget2 {
    constructor() {
        /**
         * @type {string}
         */
        this.name = null;
        /**
         * @type {string}
         */
        this.dataRequired = false;
    }
    /**
     * @return string
     */
    getName() {
        return this.name;
    }
    /**
     * @param {string} value
     */
    setName(value) {
        this.name = value;
        return this;
    }
    /**
     *
     */
    getDataRequired() {
        return this.dataRequired;
    }
    /**
     * @param {boolean} value
     */
    setDataRequired(value) {
        this.dataRequired = value;
        return this;
    }
    /**
     * @return {ComponentInterface}
     */
    getWebComponent() {
        return this.webComponent;
    }
    /**
     * @param {ComponentInterface} webComponent
     * @return {Widget2}
     */
    setWebComponent(webComponent) {
        this.webComponent = webComponent;
        return this;
    }
    /**
     * @return {ComponentInterface}
     */
    getWebComponentData() {
        return this.webComponentData;
    }
    /**
     * @param {ComponentInterface} webComponentData
     * @return {Widget2}
     */
    setWebComponentData(webComponentData) {
        this.webComponentData = webComponentData;
        return this;
    }
}
exports.Widget2 = Widget2;
