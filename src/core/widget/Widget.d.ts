import { Path } from "../../path/Path";
/**
 * @class
 * Widget
 */
export declare class Widget {
    /**
     * @type {string}
     */
    private name;
    /**
     * @type {string}
     */
    private description;
    /**
     * Name of the web component of the widget
     *
     * @type {string}
     */
    private wc;
    /**
     * Name of the web component of the data injector
     *
     * @type {string}
     */
    private wcData;
    /**
     * @type {string}
     */
    private dataProperty;
    /**
     * @type {string}
     */
    private dataLabel;
    /**
     * @type {string}
     */
    private dataRequired;
    /**
     * @type {Path}
     */
    private src;
    /**
     * @type {Path}
     */
    private srcData;
    /**
     * @return {Path}
     */
    getSrcData(): Path;
    /**
     * @return {Path}
     */
    getSrc(): Path;
    /**
     * @return {string}
     */
    getName(): string;
    /**
     * @return {string}
     */
    getWc(): string;
    /**
     * @return {string}
     */
    getWcData(): string;
}
