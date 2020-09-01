"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PathNode = void 0;
/**
 * @class Path
 */
class PathNode {
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
    }
    /**
     * @return {string}
     */
    getPath() {
        let file = '';
        if (this.nameFile && this.extension) {
            file = `${this.nameFile}.${this.extension}`;
        }
        let path = (this.directory.length) ? `${this.directory}${require('path').sep}` : '';
        return `${path}${file}`;
    }
    /**
     * @return {boolean}
     */
    isAbsolute() {
        let path = (this.directory.length) ? `${this.directory}${require('path').sep}` : '';
        return require('path').isAbsolute(`${path}${this.nameFile}.${this.extension}`);
    }
    /**
     * @param {string} directory
     */
    setDirectory(directory) {
        if (directory.slice(-1) === require('path').sep) {
            directory = directory.substring(0, directory.length - 1);
        }
        this.directory = directory;
        return this;
    }
    /**
     * @param {string} nameFile
     */
    setNameFile(nameFile) {
        this.nameFile = nameFile;
        return this;
    }
    /**
     * @param {string} extension
     */
    setExtension(extension) {
        this.extension = extension;
        return this;
    }
}
exports.PathNode = PathNode;
