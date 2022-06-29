import { WebComponent } from "../webcomponent";
/**
 * @class Module
 */
export class Module {
    constructor() {
        /**
         * @type string
         */
        this.id = null;
        /**
         * @type string
         */
        this.icon = '';
        /**
         * @type string
         */
        this.name = '';
        /**
         *
         * @type {ComponentInterface}
         */
        this.entryPoint = new WebComponent();
        /**
         * @type {string}
         */
        this.configEntryPoint = '';
        /**
         * @type string
         */
        this.label = '';
        /**
         * @type Array<ComponentInterface>
         */
        this.autoloads = [];
        /**
         * @type Array<ComponentInterface>
         */
        this.autoloadsWc = [];
        /**
          * @type Array<ComponentInterface>
         */
        this.widgets = [];
    }
    /**
     * @return {string}
     */
    getId() {
        return this.id;
    }
    /**
     * @param {string} id
     * @return {Module}
     */
    setId(id) {
        this.id = id;
        return this;
    }
    /**
     * @return {string}
     */
    getName() {
        return this.name;
    }
    /**
     * @param {string} name
     * @return {Module}
     */
    setName(name) {
        this.name = name;
        return this;
    }
    /**
     * @return {string}
     */
    getIcon() {
        return this.icon;
    }
    /**
     * @param {string} icon
     * @return {Module}
     */
    setIcon(icon) {
        this.icon = icon;
        return this;
    }
    /**
     * @return {string}
     */
    getConfigEntryPoint() {
        return this.configEntryPoint;
    }
    /**
     * @param {string} configEntryPoint
     * @return {Module}
     */
    setConfigEntryPoint(configEntryPoint) {
        this.configEntryPoint = configEntryPoint;
        return this;
    }
    /**
     * @return {Array<ComponentInterface>}
     */
    getAutoloads() {
        return this.autoloads;
    }
    /**
     * @param {Array<ComponentInterface>} autoloads
     */
    setAutoloads(autoloads) {
        this.autoloads = autoloads;
    }
    /**
     * @return {Array<ComponentInterface>}
     */
    getAutoloadsWc() {
        return this.autoloadsWc;
    }
    /**
     * @param {Array<ComponentInterface>} autoloadsWc
     */
    setAutoloadsWc(autoloadsWc) {
        this.autoloadsWc = autoloadsWc;
    }
    /**
     * @return {ComponentInterface}
     */
    getEntryPoint() {
        return this.entryPoint;
    }
    /**
     * @param {ComponentInterface} entryPoint
     * @return {this}
     */
    setEntryPoint(entryPoint) {
        this.entryPoint = entryPoint;
        return this;
    }
    /**
     * @returns {Array<ComponentInterface>}
     */
    getWidgets() {
        return this.widgets;
    }
    /**
     * @param {Array<ComponentInterface>} widgets
     * @return {this}
     */
    setWidgets(widgets) {
        this.widgets = widgets;
        return this;
    }
}
//# sourceMappingURL=Module.js.map