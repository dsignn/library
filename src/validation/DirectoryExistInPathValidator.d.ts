import { ValidationInterface } from "./ValidationInterface";
/**
 * @class
 */
export declare class DirectoryExistInPathValidator implements ValidationInterface {
    /**
     * @type string
     */
    protected defaultPath: string;
    /**
     * @inheritDoc
     */
    isValid(data: any): boolean;
    /**
     * @param {string} defaultPath
     */
    setDefaultPath(defaultPath: string): void;
}
