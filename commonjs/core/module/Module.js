"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Module = void 0;
const webcomponent_1 = require("../webcomponent");
/**
 * @class Module
 */
class Module {
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
        this.entryPoint = new webcomponent_1.WebComponent();
        /**
         * @type {string}
         */
        this.configEntryPoint = '';
        /**
         * @type {Boolean}
         */
        this.core = true;
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
          * @type Array<WidgetInterface>
         */
        this.widgets = [];
        /**
         * @type {ComponentInterface}
         */
        this.shortcutComponent = [];
        /**
         *  @type {object}
         */
        this.adminViewComponent = [];
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
     * @return {Module}
     */
    setAutoloads(autoloads) {
        this.autoloads = autoloads;
        return this;
    }
    /**
     * @return {Array<ComponentInterface>}
     */
    getAutoloadsWc() {
        return this.autoloadsWc;
    }
    /**
     * @param {Array<ComponentInterface>} autoloadsWc
     * @return {Module}
     */
    setAutoloadsWc(autoloadsWc) {
        this.autoloadsWc = autoloadsWc;
        return this;
    }
    /**
     * @return {Array<ComponentInterface>}
     */
    getShortcutComponent() {
        return this.shortcutComponent;
    }
    /**
     * @param {Array<ComponentInterface>} shortcutComponent
     * @return {Module}
     */
    setShortcutComponent(shortcutComponent) {
        this.shortcutComponent = shortcutComponent;
        return this;
    }
    /**
     * @return {Array<ComponentInterface>}
     */
    getAdminViewComponent() {
        return this.adminViewComponent;
    }
    /**
     * @param {Array<ComponentInterface>} adminViewComponent
     * @return {Module}
     */
    setAdminViewComponent(adminViewComponent) {
        this.adminViewComponent = adminViewComponent;
        return this;
    }
    /**
     * @return {ComponentInterface}
     */
    getEntryPoint() {
        return this.entryPoint;
    }
    /**
     * @param {ComponentInterface} entryPoint
     * @return {Module}
     */
    setEntryPoint(entryPoint) {
        this.entryPoint = entryPoint;
        return this;
    }
    /**
     * @returns {Array<WidgetInterface>}
     */
    getWidgets() {
        return this.widgets;
    }
    /**
     * @param {Array<WidgetInterface>} widgets
     * @return {Module}
     */
    setWidgets(widgets) {
        this.widgets = widgets;
        return this;
    }
    /**
     * @returns boolean
     */
    getCore() {
        return this.core;
    }
    setCore(core) {
        this.core = core;
        return this;
    }
}
exports.Module = Module;
