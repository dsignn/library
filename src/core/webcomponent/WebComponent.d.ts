import { Path } from "../../path/Path";
/**
 *
 */
export declare class WebComponent {
    /**
     * @type {string}
     */
    private name;
    /**
     * @type {Path}
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
     * @return {Path}
     */
    getPath(): Path;
    /**
     * @param {Path} path
     * @return {this}
     */
    setPath(path: Path): this;
}
