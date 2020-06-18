"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CallbackBuilder = void 0;
/**
 * @class CallbackBuilder
 */
class CallbackBuilder {
    constructor() {
        /**
         * @type {object}
         */
        this.callback = {};
    }
    /**
     * @param {string}method
     * @param callback
     */
    addCallback(method, callback) {
        this.callback[method] = callback;
        return this;
    }
    /**
     * @param method
     * @returns {Function}
     */
    getCallback(method) {
        return this.callback[method] ? this.callback[method] : null;
    }
    /**
     * @inheritDoc
     */
    buildUrl(rootPath, nameResource, method, id, data) {
        let callBack = this.getCallback(method);
        if (!callBack) {
            throw `No callback set for method ${method}`;
        }
        return callBack(rootPath, nameResource, method, id, data);
    }
}
exports.CallbackBuilder = CallbackBuilder;
