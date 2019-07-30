/**
 *
 */
export declare class Path {
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
    setDirectory(directory: string): void;
    /**
     * @param {string} nameFile
     */
    setNameFile(nameFile: string): void;
    /**
     * @param {string} extension
     */
    setExtension(extension: string): void;
}
