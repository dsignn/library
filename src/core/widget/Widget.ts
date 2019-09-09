import {Path} from "../../path/Path";

/**
 * @class
 * Widget
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
     * @type {Path}
     */
    private src:Path = new Path();

    /**
     * @type {Path}
     */
    private srcData:Path = new Path();

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
