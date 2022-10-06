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
    static getHomeDir(environment, appDirectory) {
        if (!environment['HOME']) {
            throw 'Dont set home directory in environment object';
        }
        if (!appDirectory) {
            throw 'Dont set app directory in environment object';
        }
        let directory;
        const os = require('os');
        const path = require('path');
        switch (os.type()) {
            case 'Linux':
                directory = `${environment['HOME']}${path.sep}.config${path.sep}${appDirectory}`;
                break;
            case 'Darwin':
                directory = `${environment['HOME']}${path.sep}Library${path.sep}Application Support${path.sep}${appDirectory}`;
                break;
            case 'Window_NT':
                directory = `${environment['HOME']}${path.sep}AppData${path.sep}Local${path.sep}${appDirectory}`;
                break;
        }
        return directory;
    }
}
exports.Utils = Utils;
