"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DirectoryExistInPathValidator = void 0;
/**
 * @class
 */
class DirectoryExistInPathValidator {
    constructor() {
        /**
         * @type string
         */
        this.defaultPath = '';
    }
    /**
     * @inheritDoc
     */
    isValid(data) {
        let isValid = false;
        const fs = require('fs');
        try {
            let content = fs.readdirSync(this.defaultPath);
            for (let cont = 0; content.length > cont; cont++) {
                if (data === content[cont]) {
                    isValid = true;
                    break;
                }
            }
        }
        catch (error) {
            // TODO
        }
        return isValid;
    }
    /**
     * @param {string} defaultPath
     */
    setDefaultPath(defaultPath) {
        this.defaultPath = defaultPath;
    }
}
exports.DirectoryExistInPathValidator = DirectoryExistInPathValidator;
