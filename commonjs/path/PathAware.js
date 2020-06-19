"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PathAware = void 0;
/**
 * @class PathAware
 */
class PathAware {
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
exports.PathAware = PathAware;
