import {ComponentInterface} from "../ComponentInterface";
import {WidgetInterface} from "./WidgetInterface";

/**
 * @class
 * Widget
 */
export class Widget implements WidgetInterface {

    /**
     * @type {string}
     */
    private name: string = null;

    /**
     * @type {string}
     */
    private description: string = null;

    /**
     * @type {string}
     */
    private label: string = null;

    /**
     * @type {string}
     */
    private property: string = null;

    /**
     * @type {boolean}
     */
    private core: true;

    /**
     * @type {string}
     */
    private require: boolean = false;

    /**
     * @type {ComponentInterface}
     */
    private webComponent: ComponentInterface;

    /**
     * @type {ComponentInterface}
     */
    private webComponentData: ComponentInterface;


    /**
     * @inheritDoc
     */
    public getName(): string {
        return this.name;
    }

    /**
     * @inheritDoc
     */
    public setName(name: string): WidgetInterface {
        this.name = name;
        return this;
    }

    /**
     * @inheritDoc
     */
    public getDescription(): string {
        return this.description;
    }

    /**
     * @inheritDoc
     */
    public setDescription(description: string): WidgetInterface {
        this.description = description;
        return this;
    }

    /**
     * @inheritDoc
     */
    public getLabel(): string {
        return this.label;
    }

    /**
     * @inheritDoc
     */
    public setLabel(label: string): WidgetInterface {
        this.label = label;
        return this;
    }

    /**
     * @inheritDoc
     */
    public getProperty(): string {
        return this.property;
    }

    /**
     * @inheritDoc
     */
    public setProperty(property: string): WidgetInterface {
        this.property = property;
        return this;
    }

    /**
     * @inheritDoc
     */
    public isRequire(): boolean {
        return this.require;
    }

    /**
     * @inheritDoc
     */
    public setRequire(require: boolean): WidgetInterface {
        this.require = require;
        return this;
    }

    /**
     * @inheritDoc
     */
    public getWebComponent(): ComponentInterface {
        return this.webComponent;
    }

    /**
     * @inheritDoc
     */
    public setWebComponent(webComponent: ComponentInterface): WidgetInterface {
        this.webComponent = webComponent;
        return this;
    }

    /**
     * @inheritDoc
     */
    public getWebComponentData(): ComponentInterface {
        return this.webComponentData;
    }

    /**
     * @inheritDoc
     */
    public setWebComponentData(webComponentData: ComponentInterface): WidgetInterface {
        this.webComponentData = webComponentData;
        return this;
    }

    /**
     * @inheritDoc
     */
    public getCore(): boolean {
        return this.core;
    }
}
