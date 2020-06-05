import { UrlBuilderInterface } from "./UrlBuilderInterface";
/**
 * @class CallbackBuilder
 */
export declare class CallbackBuilder implements UrlBuilderInterface {
    /**
     * @type {object}
     */
    protected callback: object;
    /**
     * @param {string}method
     * @param callback
     */
    addCallback(method: string, callback: Function): this;
    /**
     * @param method
     * @returns {Function}
     */
    getCallback(method: string): Function;
    /**
     * @inheritDoc
     */
    buildUrl(rootPath: string, nameResource: string, method: string, id?: string, data?: object): string;
}
