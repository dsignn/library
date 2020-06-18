import { PathInterface } from "../../path";
/**
 * @class
 * WebComponent
 */
export declare class AutoLoadClass {
    /**
     * @type {string}
     */
    private name;
    /**
     * @type {PathInterface}
     */
    private path;
    /**
     * @return {string}
     */
    getName(): string;
    /**
     * @param {string} name
     * @return {this}
     */
    setName(name: string): this;
    /**
     * @return {PathInterface}
     */
    getPath(): PathInterface;
    /**
     * @param {Path} path
     * @return {this}
     */
    setPath(path: PathInterface): this;
}
