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
    /**
     * @param {string} directory
     */
    setDirectory(directory) {
        if (directory.slice(-1) === this._pathNode.sep) {
            directory = directory.substring(0, directory.length - 1);
        }
        this.directory = directory;
    }
    /**
     * @param {string} nameFile
     */
    setNameFile(nameFile) {
        this.nameFile = nameFile;
    }
    /**
     * @param {string} extension
     */
    setExtension(extension) {
        this.extension = extension;
    }
}
//# sourceMappingURL=Path.js.map