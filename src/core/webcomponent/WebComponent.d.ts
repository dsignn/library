import { PathAware } from "../../path/PathAware";
import { ComponentInterface } from "../ComponentInterface";
/**
 * @class
 * WebComponent
 */
export declare class WebComponent extends PathAware implements ComponentInterface {
    /**
     * @type {string}
     */
    private name;
    /**
     * @return {string}
     */
    getName(): string;
    /**
     * @param {string} name
     * @return {this}
     */
    setName(name: string): this;
}
