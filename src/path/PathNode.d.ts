/**
 *
 */
import { PathInterface } from "./PathInterface";
/**
 * @class Path
 */
export declare class PathNode implements PathInterface {
    /**
     * @type {string}
     */
    protected nameFile: string;
    /**
     * @type {string}
     */
    protected directory: string;
    /**
     * @type {string}
     */
    protected extension: string;
    /**
     * @type {path}
     */
    private _pathNode;
    /**
     * @return {string}
     */
    getPath(): string;
    /**
     * @return {boolean}
     */
    isAbsolute(): any;
    /**
     * @param {string} directory
     */
    setDirectory(directory: string): PathInterface;
    /**
     * @param {string} nameFile
     */
    setNameFile(nameFile: string): PathInterface;
    /**
     * @param {string} extension
     */
    setExtension(extension: string): PathInterface;
}
