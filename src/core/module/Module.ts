/**
 *  Module
 */
import {WebComponent} from "../webcomponent";

export class Module {

    /**
     * @type string
     */
    private id: string = null;

    /**
     * @type string
     */
    private icon: string = '';

    /**
     * @type string
     */
    private name: string = '';

    /**
     *
     * @type {WebComponent}
     */
    private entryPoint: WebComponent = new WebComponent();

    /**
     * @type {string}
     */
    private configEntryPoint:string = '';

    /**
     * @type string
     */
    private label: string = '';

    /**
     * @type Array<string>
     */
    private autoloads: Array<string> = [];

    /**
     * @type Array<string>
     */
    private autoloadsWs: Array<WebComponent> = [];

    /**
     * @return {string}
     */
    public getId() {
        return this.id;
    }

    /**
     * @param {string} id
     * @return {Module}
     */
    public setId(id: string) {
        this.id = id;
        return this;
    }

    /**
     * @return {string}
     */
    public getName() {
        return this.name;
    }

    /**
     * @param {string} name
     * @return {Module}
     */
    public setName(name: string) {
        this.name = name;
        return this;
    }

    /**
     * @return {string}
     */
    public getIcon() {
        return this.icon;
    }

    /**
     * @param {string} icon
     * @return {Module}
     */
    public setIcon(icon: string) {
        this.icon = icon;
        return this;
    }

    /**
     * @return {string}
     */
    public getConfigEntryPoint() {
        return this.configEntryPoint;
    }

    /**
     * @param {string} configEntryPoint
     * @return {Module}
     */
    public setConfigEntryPoint(configEntryPoint: string) {
        this.configEntryPoint = configEntryPoint;
        return this;
    }

    /**
     * @return {Array<string>}
     */
    public getAutoloads() {
        return this.autoloads;
    }

    /**
     */
    public setAutoloads(autoloads: Array<string>) {
        this.autoloads = autoloads;
    }

    /**
     * @return {Array<WebComponent>}
     */
    public getAutoloadsWs() {
        return this.autoloadsWs;
    }

    /**
     * @param {Array<WebComponent>} autoloadsWs
     */
    public setAutoloadsWs(autoloadsWs: Array<WebComponent>) {
        this.autoloadsWs = autoloadsWs;
    }

    /**
     * @return {WebComponent}
     */
    public getEntryPoint() {
        return this.entryPoint;
    }

    /**
     * @param {WebComponent} entryPoint
     * @return {this}
     */
    public setEntryPoint(entryPoint : WebComponent) {
        this.entryPoint = entryPoint;
        return this;
    }
}
