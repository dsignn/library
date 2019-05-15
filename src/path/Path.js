/**
 *
 */
export class Path {
    constructor() {
        /**
         * @type {string}
         */
        this.nameFile = '';
        /**
         * @type {string}
         */
        this.directory = '';
        /**
         * @type {string}
         */
        this.extension = '';
        /**
         * @type {path}
         */
        this._pathNode = require('path');
    }
    /**
     * @return {string}
     */
    getPath() {
        let file = '';
        if (this.nameFile && this.extension) {
            file = `${this.nameFile}.${this.extension}`;
        }
        let path = (this.directory.length) ? `${this.directory}${this._pathNode.sep}` : '';
        return `${path}${file}`;
    }
    /**
     * @return {boolean}
     */
    isAbsolute() {
        let path = (this.directory.length) ? `${this.directory}${this._pathNode.sep}` : '';
        return this._pathNode.isAbsolute(`${path}${this.nameFile}.${this.extension}`);
    }
}
//# sourceMappingURL=Path.js.map