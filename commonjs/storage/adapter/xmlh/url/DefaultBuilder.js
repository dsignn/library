"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultBuilder = void 0;
/**
 * @class DefaultBuilder
 */
class DefaultBuilder {
    /**
     *
     * @inheritDoc
     */
    buildUrl(rootPath, nameResource, method, id, data) {
        let url = `${rootPath}/${nameResource}`;
        url = id ? `${url}/${id}` : url;
        return url;
    }
}
exports.DefaultBuilder = DefaultBuilder;
