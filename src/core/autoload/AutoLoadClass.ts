import {Path} from "../../path/Path";
import {PathInterface} from "../../path";

/**
 * @class
 * WebComponent
 */
export class AutoLoadClass {

    /**
     * @type {string}
     */
    private name: string = null;

    /**
     * @type {PathInterface}
     */
    private path: PathInterface;

    /**
     * @return {string}
     */
    public getName(): string {
        return this.name;
    }

    /**
     * @param {string} name
     * @return {this}
     */
    public setName(name : string): AutoLoadClass {
        this.name = name;
        return this;
    }

    /**
     * @return {PathInterface}
     */
    public getPath(): PathInterface {
        return this.path;
    }

    /**
     * @param {Path} path
     * @return {this}
     */
    public setPath(path : PathInterface): AutoLoadClass {
        this.path = path;
        return this;
    }
}
