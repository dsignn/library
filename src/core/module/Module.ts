import {WebComponent} from "../webcomponent";
import {ComponentInterface} from "../ComponentInterface";

/**
 * @class Module
 */
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
     * @type {ComponentInterface}
     */
    private entryPoint: ComponentInterface = new WebComponent();

    /**
     * @type {string}
     */
    private configEntryPoint:string = '';

    /**
     * @type string
     */
    private label: string = '';

    /**
     * @type Array<ComponentInterface>
     */
    private autoloads: Array<ComponentInterface> = [];

    /**
     * @type Array<ComponentInterface>
     */
    private autoloadsWs: Array<ComponentInterface> = [];

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
     * @return {Array<ComponentInterface>}
     */
    public getAutoloads() {
        return this.autoloads;
    }

    /**
     * @param {Array<ComponentInterface>} autoloads
     */
    public setAutoloads(autoloads: Array<ComponentInterface>) {
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
    public setAutoloadsWs(autoloadsWs: Array<ComponentInterface>) {
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
    public setEntryPoint(entryPoint: ComponentInterface) {
        this.entryPoint = entryPoint;
        return this;
    }
}
