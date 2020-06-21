/**
 *
 */
import {PathInterface} from "./PathInterface";

/**
 * @class PathGeneric
 */
export class PathGeneric implements PathInterface {

    protected sep = '/';

    /**
     * @type {string}
     */
    protected nameFile:string = '';

    /**
     * @type {string}
     */
    protected directory:string = '';

    /**
     * @type {string}
     */
    protected extension:string = '';

    /**
     * @return {string}
     */
    public getPath(): string {
        let file = '';
        if (this.nameFile && this.extension) {
            file = `${this.nameFile}.${this.extension}`;
        }

        let path = (this.directory.length) ? `${this.directory}${this.sep}`: '';

        return `${path}${file}`;
    }

    /**
     * @return {boolean}
     */
    public isAbsolute(): boolean {

       throw 'IMPLEMENTS';
    }

    /**
     * @param {string} directory
     */
    public setDirectory(directory:string): PathInterface {
        if (directory.slice(-1) === this.sep) {
            directory = directory.substring(0, directory.length - 1);
        }
        this.directory = directory;
        return this;
    }

    /**
     * @param {string} nameFile
     */
    public setNameFile(nameFile:string): PathInterface {
        this.nameFile = nameFile;
        return this;
    }

    /**
     * @param {string} extension
     */
    public setExtension(extension:string): PathInterface {
        this.extension = extension;
        return this;
    }
}
