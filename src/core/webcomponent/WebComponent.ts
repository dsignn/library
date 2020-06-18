import {Path} from "../../path/Path";
import {PathInterface} from "../../path";

/**
 * @class
 * WebComponent
 */
export class WebComponent {

    /**
     * @type {string}
     */
    private name:string = null;

    /**
     * @type {PathInterface}
     */
    private path:PathInterface;

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

    /**
     * @return {PathInterface}
     */
    public getPath() {
        return this.path;
    }

    /**
     * @param {Path} path
     * @return {this}
     */
    public setPath(path : PathInterface) {
        this.path = path;
        return this;
    }
}
