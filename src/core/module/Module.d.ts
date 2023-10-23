import { ComponentInterface } from "../ComponentInterface";
import { WidgetInterface } from "../widget/WidgetInterface";
/**
 * @class Module
 */
export declare class Module {
    /**
     * @type string
     */
    private id;
    /**
     * @type string
     */
    private icon;
    /**
     * @type string
     */
    private name;
    /**
     *
     * @type {ComponentInterface}
     */
    private entryPoint;
    /**
     * @type {string}
     */
    private configEntryPoint;
    /**
     * @type {Boolean}
     */
    private core;
    /**
     * @type string
     */
    private label;
    /**
     * @type Array<ComponentInterface>
     */
    private autoloads;
    /**
     * @type Array<ComponentInterface>
     */
    private autoloadsWc;
    /**
      * @type Array<WidgetInterface>
     */
    private widgets;
    /**
     * @type {ComponentInterface}
     */
    private shortcutComponent;
    /**
     *  @type {object}
     */
    private adminViewComponent;
    /**
     * @return {string}
     */
    getId(): string;
    /**
     * @param {string} id
     * @return {Module}
     */
    setId(id: string): this;
    /**
     * @return {string}
     */
    getName(): string;
    /**
     * @param {string} name
     * @return {Module}
     */
    setName(name: string): Module;
    /**
     * @return {string}
     */
    getIcon(): string;
    /**
     * @param {string} icon
     * @return {Module}
     */
    setIcon(icon: string): Module;
    /**
     * @return {string}
     */
    getConfigEntryPoint(): string;
    /**
     * @param {string} configEntryPoint
     * @return {Module}
     */
    setConfigEntryPoint(configEntryPoint: string): Module;
    /**
     * @return {Array<ComponentInterface>}
     */
    getAutoloads(): ComponentInterface[];
    /**
     * @param {Array<ComponentInterface>} autoloads
     * @return {Module}
     */
    setAutoloads(autoloads: Array<ComponentInterface>): Module;
    /**
     * @return {Array<ComponentInterface>}
     */
    getAutoloadsWc(): ComponentInterface[];
    /**
     * @param {Array<ComponentInterface>} autoloadsWc
     * @return {Module}
     */
    setAutoloadsWc(autoloadsWc: Array<ComponentInterface>): Module;
    /**
     * @return {Array<ComponentInterface>}
     */
    getShortcutComponent(): ComponentInterface[];
    /**
     * @param {Array<ComponentInterface>} shortcutComponent
     * @return {Module}
     */
    setShortcutComponent(shortcutComponent: Array<ComponentInterface>): Module;
    /**
     * @return {Array<ComponentInterface>}
     */
    getAdminViewComponent(): ComponentInterface[];
    /**
     * @param {Array<ComponentInterface>} adminViewComponent
     * @return {Module}
     */
    setAdminViewComponent(adminViewComponent: Array<ComponentInterface>): Module;
    /**
     * @return {ComponentInterface}
     */
    getEntryPoint(): ComponentInterface;
    /**
     * @param {ComponentInterface} entryPoint
     * @return {Module}
     */
    setEntryPoint(entryPoint: ComponentInterface): Module;
    /**
     * @returns {Array<WidgetInterface>}
     */
    getWidgets(): WidgetInterface[];
    /**
     * @param {Array<WidgetInterface>} widgets
     * @return {Module}
     */
    setWidgets(widgets: Array<WidgetInterface>): Module;
    /**
     * @returns boolean
     */
    getCore(): Boolean;
    setCore(core: Boolean): Module;
}
