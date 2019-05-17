import {Path} from "../../path/Path";

/**
 *  Widget
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
     * @type {string}
     */
    private wc:string = null;

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
    private path:Path = new Path();

    /**
     * @return {string}
     */
    public getWc() {
        return this.wc;
    }
}
