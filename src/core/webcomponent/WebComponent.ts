import {PathAware} from "../../path/PathAware";
import {ComponentInterface} from "../ComponentInterface";

/**
 * @class
 * WebComponent
 */
export class WebComponent extends PathAware implements ComponentInterface {

    /**
     * @type {string}
     */
    private name:string = null;

    /**
     * @return {string}
     */
    public getName() {
        return this.name;
    }

    /**
     * @param {string} name
     * @return {this}
     */
    public setName(name : string) {
        this.name = name;
        return this;
    }
}
