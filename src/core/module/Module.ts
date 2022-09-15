import {WebComponent} from "../webcomponent";
import {ComponentInterface} from "../ComponentInterface";
import { Widget } from "../widget";
import { WidgetInterface } from "../widget/WidgetInterface";

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
    private configEntryPoint: string = '';

    /**
     * @type {Boolean}
     */
    private core: Boolean = true;

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
      * @type Array<WidgetInterface>
     */
    private widgets: Array<WidgetInterface> = [];

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
    public setName(name: string): Module {
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
    public setIcon(icon: string): Module {
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
    public setConfigEntryPoint(configEntryPoint: string): Module {
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
     * @return {Module}
     */
    public setAutoloads(autoloads: Array<ComponentInterface>): Module {
        this.autoloads = autoloads;
        return this
    }

    /**
     * @return {Array<ComponentInterface>}
     */
    public getAutoloadsWc() {
        return this.autoloadsWc;
    }

    /**
     * @param {Array<ComponentInterface>} autoloadsWc
     * @return {Module}
     */
    public setAutoloadsWc(autoloadsWc: Array<ComponentInterface>): Module {
        this.autoloadsWc = autoloadsWc;
        return this
    }

    /**
     * @return {ComponentInterface}
     */
    public getEntryPoint() {
        return this.entryPoint;
    }

    /**
     * @param {ComponentInterface} entryPoint
     * @return {Module}
     */
    public setEntryPoint(entryPoint: ComponentInterface): Module {
        this.entryPoint = entryPoint;
        return this;
    }

    /**
     * @returns {Array<WidgetInterface>} 
     */
    public getWidgets() {
        return this.widgets;
    }

    /**
     * @param {Array<WidgetInterface>} widgets
     * @return {Module}
     */
    public setWidgets(widgets: Array<WidgetInterface>): Module {
        this.widgets = widgets;
        return this;
    }

    /**
     * @returns boolean
     */
    public getCore(): Boolean {
        return this.core;
    }

    public setCore(core: Boolean): Module {
        this.core = core;
        return this;
    }
}
