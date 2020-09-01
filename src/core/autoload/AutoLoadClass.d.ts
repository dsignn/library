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
    setName(name: string): AutoLoadClass;
    /**
     * @return {PathInterface}
     */
    getPath(): PathInterface;
    /**
     * @param {PathNode} path
     * @return {this}
     */
    setPath(path: PathInterface): AutoLoadClass;
}
