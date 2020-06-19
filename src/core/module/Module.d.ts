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
     * @type {WebComponent}
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
     * @type Array<string>
     */
    private autoloads;
    /**
     * @type Array<string>
     */
    private autoloadsWs;
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
     * @return {Array<WebComponent>}
     */
    getAutoloadsWs(): ComponentInterface[];
    /**
     * @param {Array<WebComponent>} autoloadsWs
     */
    setAutoloadsWs(autoloadsWs: Array<ComponentInterface>): void;
    /**
     * @return {WebComponent}
     */
    getEntryPoint(): ComponentInterface;
    /**
     * @param {WebComponent} entryPoint
     * @return {this}
     */
    setEntryPoint(entryPoint: ComponentInterface): this;
}
