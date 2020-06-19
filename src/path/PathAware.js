/**
 * @class PathAware
 */
export class PathAware {
    /**
     * @param {PathInterface} path
     * @return PathAwareInterface
     */
    setPath(path) {
        this.path = path;
        return this;
    }
    /**
     * @return PathInterface
     */
    getPath() {
        return this.path;
    }
}
//# sourceMappingURL=PathAware.js.map