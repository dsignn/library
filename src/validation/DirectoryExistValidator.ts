import {ValidationInterface} from "./ValidationInterface";
import {isArray} from "util";

/**
 * @class
 */
export class DirectoryExistValidator implements ValidationInterface {

    /**
     * @inheritDoc
     */
    isValid(data: any): boolean {
        let isValid = false;
        const fs = require('fs');

        switch (true) {
            case typeof data === 'string':
                isValid = fs.existsSync(data);
                break;
            case typeof data === 'object' && Array.isArray(data) === true:
                for (let cont = 0; data.length > cont; cont++) {
                    isValid = isValid || fs.existsSync(data[cont]);
                }
                break;
        }

        return isValid;
    }
}