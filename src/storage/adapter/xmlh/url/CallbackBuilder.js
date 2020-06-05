/**
 * @class CallbackBuilder
 */
export class CallbackBuilder {
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
//# sourceMappingURL=CallbackBuilder.js.map