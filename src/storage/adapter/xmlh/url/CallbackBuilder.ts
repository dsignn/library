
import {UrlBuilderInterface} from "./UrlBuilderInterface";

/**
 * @class CallbackBuilder
 */
export class CallbackBuilder implements UrlBuilderInterface {

    /**
     * @type {object}
     */
    protected callback: object = {};

    /**
     * @param {string}method
     * @param callback
     */
    addCallback(method: string, callback: Function) {
        this.callback[method] = callback;
        return this;
    }

    /**
     * @param method
     * @returns {Function}
     */
    getCallback(method: string): Function {
        return this.callback[method] ? this.callback[method] : null;
    }

    /**
     * @inheritDoc
     */
    buildUrl(rootPath: string, nameResource: string, method: string, id?: string, data?: object): string {
        let callBack = this.getCallback(method);
        if (!callBack) {
            throw `No callback set for method ${method}`;
        }
        return callBack(rootPath, nameResource, method, id, data);
    }
}