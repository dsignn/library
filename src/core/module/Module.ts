import {WebComponent} from "../webcomponent";
import {ComponentInterface} from "../ComponentInterface";
import { Widget } from "../widget";

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
    private autoloadsWc: Array<ComponentInterface> = [];

    /**
      * @type Array<ComponentInterface>
     */
    private widgets: Array<ComponentInterface> = [];

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
     * @return {Array<ComponentInterface>}
     */
    public getAutoloadsWc() {
        return this.autoloadsWc;
    }

    /**
     * @param {Array<ComponentInterface>} autoloadsWc
     */
    public setAutoloadsWc(autoloadsWc: Array<ComponentInterface>) {
        this.autoloadsWc = autoloadsWc;
    }

    /**
     * @return {ComponentInterface}
     */
    public getEntryPoint() {
        return this.entryPoint;
    }

    /**
     * @param {ComponentInterface} entryPoint
     * @return {this}
     */
    public setEntryPoint(entryPoint: ComponentInterface) {
        this.entryPoint = entryPoint;
        return this;
    }

    /**
     * @returns {Array<ComponentInterface>} 
     */
    public getWidgets() {
        return this.widgets;
    }

    /**
     * @param {Array<ComponentInterface>} widgets
     * @return {this}
     */
    public setWidgets(widgets: Array<ComponentInterface>) {
        this.widgets = widgets;
        return this;
    }
}
