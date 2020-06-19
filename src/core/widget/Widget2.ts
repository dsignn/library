import {ComponentInterface} from "../ComponentInterface";

/**
 * @class
 * Widget
 */
export class Widget2 {

    /**
     * @type {string}
     */
    private name:string = null;

    /**
     * @type {string}
     */
    private dataRequired: boolean = false;

    /**
     * @type {ComponentInterface}
     */
    private webComponent: ComponentInterface;

    /**
     * @type {ComponentInterface}
     */
    private webComponentData: ComponentInterface;

    /**
     * @return string
     */
    public getName(): string {
        return this.name;
    }

    /**
     * @param {string} value
     */
    public setName(value: string): Widget2{
        this.name = value;
        return this;
    }

    /**
     *
     */
    public getDataRequired(): boolean {
        return this.dataRequired;
    }

    /**
     * @param {boolean} value
     */
    public setDataRequired(value: boolean): Widget2 {
        this.dataRequired = value;
        return this;
    }

    /**
     * @return {ComponentInterface}
     */
    public getWebComponent(): ComponentInterface {
        return this.webComponent;
    }

    /**
     * @param {ComponentInterface} webComponent
     * @return {Widget2}
     */
    public setWebComponent(webComponent: ComponentInterface): Widget2 {
        this.webComponent = webComponent;
        return this;
    }

    /**
     * @return {ComponentInterface}
     */
    public getWebComponentData(): ComponentInterface {
        return this.webComponentData;
    }

    /**
     * @param {ComponentInterface} webComponentData
     * @return {Widget2}
     */
    public setWebComponentData(webComponentData: ComponentInterface): Widget2 {
        this.webComponentData = webComponentData;
        return this;
    }
}
