/**
 *  @class Utils
 */
export class Utils {

    /**
     *
     * @param environment
     */
    public static getHomeDir(environment: object, appDirectory: string): string {

        if (!environment['HOME'] && !environment['LOCALAPPDATA']) {
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
            case 'Windows_NT':
                directory = `${environment['LOCALAPPDATA']}${path.sep}${appDirectory}`;
                break;
        }

        return directory;
    }
}