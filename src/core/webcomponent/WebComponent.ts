import {Path} from "../../path/Path";

/**
 *
 */
export class WebComponent {

    /**
     * @type {string}
     */
    private name:string = null;

    /**
     * @type {Path}
     */
    private path:Path = new Path();

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
     * @return {Path}
     */
    public getPath() {
        return this.path;
    }

    /**
     * @param {Path} path
     * @return {this}
     */
    public setPath(path : Path) {
        this.path = path;
        return this;
    }
}
