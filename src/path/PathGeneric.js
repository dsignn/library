/**
 * @class PathGeneric
 */
export class PathGeneric {
    constructor() {
        this.sep = '/';
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
        let path = (this.directory.length) ? `${this.directory}${this.sep}` : '';
        return `${path}${file}`;
    }
    /**
     * @return {boolean}
     */
    isAbsolute() {
        throw 'IMPLEMENTS';
    }
    /**
     * @param {string} directory
     */
    setDirectory(directory) {
        if (directory.slice(-1) === this.sep) {
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
//# sourceMappingURL=PathGeneric.js.map