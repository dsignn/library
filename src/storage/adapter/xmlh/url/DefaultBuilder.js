/**
 * @class DefaultBuilder
 */
export class DefaultBuilder {
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
//# sourceMappingURL=DefaultBuilder.js.map