/**
 *
 */
export class Path {

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
     * @type {path}
     */
    private _pathNode:any = require('path');

    /**
     * @return {string}
     */
    public getPath() {
        let file = '';
        if (this.nameFile && this.extension) {
            file = `${this.nameFile}.${this.extension}`;
        }

        let path = (this.directory.length) ? `${this.directory}${this._pathNode.sep}`: '';

        return `${path}${file}`;
    }

    /**
     * @return {boolean}
     */
    public isAbsolute() {

        let path = (this.directory.length) ? `${this.directory}${this._pathNode.sep}`: '';
        return this._pathNode.isAbsolute(`${path}${this.nameFile}.${this.extension}`);
    }

    /**
     * @param {string} directory
     */
    public setDirectory(directory:string) {
        if (directory.slice(-1) === this._pathNode.sep) {
            directory = directory.substring(0, directory.length - 1);
        }
        this.directory = directory
    }

    /**
     * @param {string} nameFile
     */
    public setNameFile(nameFile:string) {
        this.nameFile = nameFile
    }

    /**
     * @param {string} extension
     */
    public setExtension(extension:string) {
        this.extension = extension
    }
}
