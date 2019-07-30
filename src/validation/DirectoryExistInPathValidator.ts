import {ValidationInterface} from "./ValidationInterface";
import {isArray} from "util";

/**
 * @class
 */
export class DirectoryExistInPathValidator implements ValidationInterface {

    /**
     * @type string
     */
    protected defaultPath: string = '';

    /**
     * @inheritDoc
     */
    isValid(data: any): boolean {
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
        } catch (error) {
            // TODO
        }

        return isValid;
    }

    /**
     * @param {string} defaultPath
     */
    setDefaultPath(defaultPath: string) {
        this.defaultPath = defaultPath;
    }
}