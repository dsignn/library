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
}
