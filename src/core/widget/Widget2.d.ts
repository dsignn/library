import { ComponentInterface } from "../ComponentInterface";
/**
 * @class
 * Widget
 */
export declare class Widget2 {
    /**
     * @type {string}
     */
    private name;
    /**
     * @type {string}
     */
    private dataRequired;
    /**
     * @type {ComponentInterface}
     */
    private webComponent;
    /**
     * @type {ComponentInterface}
     */
    private webComponentData;
    /**
     * @return string
     */
    getName(): string;
    /**
     * @param {string} value
     */
    setName(value: string): Widget2;
    /**
     *
     */
    getDataRequired(): boolean;
    /**
     * @param {boolean} value
     */
    setDataRequired(value: boolean): Widget2;
    /**
     * @return {ComponentInterface}
     */
    getWebComponent(): ComponentInterface;
    /**
     * @param {ComponentInterface} webComponent
     * @return {Widget2}
     */
    setWebComponent(webComponent: ComponentInterface): Widget2;
    /**
     * @return {ComponentInterface}
     */
    getWebComponentData(): ComponentInterface;
    /**
     * @param {ComponentInterface} webComponentData
     * @return {Widget2}
     */
    setWebComponentData(webComponentData: ComponentInterface): Widget2;
}
