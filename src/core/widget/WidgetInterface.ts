import {ComponentInterface} from "../ComponentInterface";

/**
 * @interface WidgetInterface
 */
export interface WidgetInterface {

    /**
     * @return string
     */
    getName(): string;

    /**
     * @param {string} name
     */
    setName(name: string): WidgetInterface;

    /**
     * @return string
     */
    getDescription(): string;

    /**
     * @param {string} description
     */
    setDescription(description: string): WidgetInterface;

    /**
     * @return string
     */
    getLabel(): string;

    /**
     * @param {string} label
     */
    setLabel(label: string): WidgetInterface;

    /**
     * @return string
     */
    getProperty(): string;

    /**
     * @param {string} property
     */
    setProperty(property: string): WidgetInterface;

    /**
     * @return string
     */
    isRequire(): boolean;

    /**
     * @param {string} require
     */
    setRequire(require: boolean): WidgetInterface;

    /**
     * @return ComponentInterface
     */
    getWebComponent(): ComponentInterface;

    /**
     * @param ComponentInterface webComponent
     * @return WidgetInterface
     */
    setWebComponent(webComponent: ComponentInterface): WidgetInterface;

    /**
     * @return ComponentInterface
     */
    getWebComponentData(): ComponentInterface;

    /**
     * @param webComponentData
     * @return WidgetInterface
     */
    setWebComponentData(webComponentData: ComponentInterface): WidgetInterface

}
