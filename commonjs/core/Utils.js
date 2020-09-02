"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Utils = void 0;
/**
 *  @class Utils
 */
class Utils {
    /**
     *
     * @param environment
     */
    static getHomeDir(environment) {
        if (!environment['HOME']) {
            throw 'Dont set home directory in environment object';
        }
        if (!environment['npm_package_name']) {
            throw 'Dont set the name in the package json';
        }
        let directory;
        const os = require('os');
        const path = require('path');
        switch (os.type()) {
            case 'Linux':
                directory = `${environment['HOME']}${path.sep}.config${path.sep}${environment['npm_package_name']}`;
                break;
            case 'Darwin':
                directory = `${environment['HOME']}${path.sep}Library${path.sep}Application Support${path.sep}${environment['npm_package_name']}`;
                break;
            case 'Window_NT':
                directory = `${environment['HOME']}${path.sep}AppData${path.sep}Local${path.sep}${environment['npm_package_name']}`;
                break;
        }
        return directory;
    }
}
exports.Utils = Utils;
