"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 *
 */
class Fs {
    /**
     * @param {string} path
     */
    static removeDirSync(path) {
        const fs = require('fs');
        if (fs.existsSync(path)) {
            fs.readdirSync(path).forEach(function (file, index) {
                var curPath = path + "/" + file;
                if (fs.lstatSync(curPath).isDirectory()) { // recurse
                    Fs.removeDirSync(curPath);
                }
                else { // delete file
                    fs.unlinkSync(curPath);
                }
            });
            fs.rmdirSync(path);
        }
    }
}
exports.Fs = Fs;
