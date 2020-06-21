/**
 *
 */
import { PathInterface } from "./PathInterface";
/**
 * @class PathGeneric
 */
export declare class PathGeneric implements PathInterface {
    protected sep: string;
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
     * @return {string}
     */
    getPath(): string;
    /**
     * @return {boolean}
     */
    isAbsolute(): boolean;
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
