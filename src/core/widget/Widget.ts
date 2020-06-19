import {Path, PathInterface} from "../../path/index";

/**
 * @class Widget
 * @deprecated
 */
export class Widget {

    /**
     * @type {string}
     */
    private name:string = null;

    /**
     * @type {string}
     */
    private description:string = null;

    /**
     * Name of the web component of the widget
     *
     * @type {string}
     */
    private wc:string = null;

    /**
     * Name of the web component of the data injector
     *
     * @type {string}
     */
    private wcData:string = null;

    /**
     * @type {string}
     */
    private dataProperty:string = null;

    /**
     * @type {string}
     */
    private dataLabel:string = null;

    /**
     * @type {string}
     */
    private dataRequired:boolean = false;

    /**
     * @type {PathInterface
     * }
     */
    private src:PathInterface;

    /**
     * @type {Path}
     */
    private srcData:PathInterface;

    /**
     * @return {Path}
     */
    public getSrcData() {
        return this.srcData;
    }

    /**
     * @return {Path}
     */
    public getSrc() {
        return this.src;
    }

    /**
     * @return {string}
     */
    public getName() {
        return this.name;
    }

    /**
     * @return {string}
     */
    public getWc() {
        return this.wc;
    }

    /**
     * @return {string}
     */
    public getWcData() {
        return this.wcData;
    }
}
