"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Widget = void 0;
/**
 * @class
 * Widget
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
        this.label = null;
        /**
         * @type {string}
         */
        this.property = null;
        /**
         * @type {string}
         */
        this.require = false;
    }
    /**
     * @inheritDoc
     */
    getName() {
        return this.name;
    }
    /**
     * @inheritDoc
     */
    setName(name) {
        this.name = name;
        return this;
    }
    /**
     * @inheritDoc
     */
    getDescription() {
        return this.description;
    }
    /**
     * @inheritDoc
     */
    setDescription(description) {
        this.description = description;
        return this;
    }
    /**
     * @inheritDoc
     */
    getLabel() {
        return this.label;
    }
    /**
     * @inheritDoc
     */
    setLabel(label) {
        this.label = label;
        return this;
    }
    /**
     * @inheritDoc
     */
    getProperty() {
        return this.property;
    }
    /**
     * @inheritDoc
     */
    setProperty(property) {
        this.property = property;
        return this;
    }
    /**
     * @inheritDoc
     */
    isRequire() {
        return this.require;
    }
    /**
     * @inheritDoc
     */
    setRequire(require) {
        this.require = require;
        return this;
    }
    /**
     * @inheritDoc
     */
    getWebComponent() {
        return this.webComponent;
    }
    /**
     * @inheritDoc
     */
    setWebComponent(webComponent) {
        this.webComponent = webComponent;
        return this;
    }
    /**
     * @inheritDoc
     */
    getWebComponentData() {
        return this.webComponentData;
    }
    /**
     * @inheritDoc
     */
    setWebComponentData(webComponentData) {
        this.webComponentData = webComponentData;
        return this;
    }
}
exports.Widget = Widget;
