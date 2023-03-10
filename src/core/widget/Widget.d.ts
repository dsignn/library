import { ComponentInterface } from "../ComponentInterface";
import { WidgetInterface } from "./WidgetInterface";
/**
 * @class
 * Widget
 */
export declare class Widget implements WidgetInterface {
    /**
     * @type {string}
     */
    private name;
    /**
     * @type {string}
     */
    private description;
    /**
     * @type {string}
     */
    private label;
    /**
     * @type {string}
     */
    private property;
    /**
     * @type {boolean}
     */
    private core;
    /**
     * @type {string}
     */
    private require;
    /**
     * @type {ComponentInterface}
     */
    private webComponent;
    /**
     * @type {ComponentInterface}
     */
    private webComponentData;
    /**
     * @inheritDoc
     */
    getName(): string;
    /**
     * @inheritDoc
     */
    setName(name: string): WidgetInterface;
    /**
     * @inheritDoc
     */
    getDescription(): string;
    /**
     * @inheritDoc
     */
    setDescription(description: string): WidgetInterface;
    /**
     * @inheritDoc
     */
    getLabel(): string;
    /**
     * @inheritDoc
     */
    setLabel(label: string): WidgetInterface;
    /**
     * @inheritDoc
     */
    getProperty(): string;
    /**
     * @inheritDoc
     */
    setProperty(property: string): WidgetInterface;
    /**
     * @inheritDoc
     */
    isRequire(): boolean;
    /**
     * @inheritDoc
     */
    setRequire(require: boolean): WidgetInterface;
    /**
     * @inheritDoc
     */
    getWebComponent(): ComponentInterface;
    /**
     * @inheritDoc
     */
    setWebComponent(webComponent: ComponentInterface): WidgetInterface;
    /**
     * @inheritDoc
     */
    getWebComponentData(): ComponentInterface;
    /**
     * @inheritDoc
     */
    setWebComponentData(webComponentData: ComponentInterface): WidgetInterface;
    /**
     * @inheritDoc
     */
    getCore(): boolean;
}
