/**
 *
 */
import {PathInterface} from "./PathInterface";

/**
 * @class Path
 */
export class PathNode implements PathInterface {

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
    public getPath() {
        let file = '';
        if (this.nameFile && this.extension) {
            file = `${this.nameFile}.${this.extension}`;
        }

        let path = (this.directory.length) ? `${this.directory}${require('path').sep}`: '';

        return `${path}${file}`;
    }

    /**
     * @return {boolean}
     */
    public isAbsolute() {

        let path = (this.directory.length) ? `${this.directory}${require('path').sep}`: '';
        return require('path').isAbsolute(`${path}${this.nameFile}.${this.extension}`);
    }

    /**
     * @param {string} directory
     */
    public setDirectory(directory:string): PathInterface {
        if (directory.slice(-1) === require('path').sep) {
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
