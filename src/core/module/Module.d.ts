import { ComponentInterface } from "../ComponentInterface";
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
      * @type Array<ComponentInterface>
     */
    private widgets;
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
    setName(name: string): this;
    /**
     * @return {string}
     */
    getIcon(): string;
    /**
     * @param {string} icon
     * @return {Module}
     */
    setIcon(icon: string): this;
    /**
     * @return {string}
     */
    getConfigEntryPoint(): string;
    /**
     * @param {string} configEntryPoint
     * @return {Module}
     */
    setConfigEntryPoint(configEntryPoint: string): this;
    /**
     * @return {Array<ComponentInterface>}
     */
    getAutoloads(): ComponentInterface[];
    /**
     * @param {Array<ComponentInterface>} autoloads
     */
    setAutoloads(autoloads: Array<ComponentInterface>): void;
    /**
     * @return {Array<ComponentInterface>}
     */
    getAutoloadsWc(): ComponentInterface[];
    /**
     * @param {Array<ComponentInterface>} autoloadsWc
     */
    setAutoloadsWc(autoloadsWc: Array<ComponentInterface>): void;
    /**
     * @return {ComponentInterface}
     */
    getEntryPoint(): ComponentInterface;
    /**
     * @param {ComponentInterface} entryPoint
     * @return {this}
     */
    setEntryPoint(entryPoint: ComponentInterface): this;
    /**
     * @returns {Array<ComponentInterface>}
     */
    getWidgets(): ComponentInterface[];
    /**
     * @param {Array<ComponentInterface>} widgets
     * @return {this}
     */
    setWidgets(widgets: Array<ComponentInterface>): this;
}
