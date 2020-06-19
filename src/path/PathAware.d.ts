import { PathInterface } from "./PathInterface";
import { PathAwareInterface } from "./PathAwareInterface";
/**
 * @class PathAware
 */
export declare class PathAware implements PathAwareInterface {
    /**
     * @type PathInterface
     */
    protected path: PathInterface;
    /**
     * @param {PathInterface} path
     * @return PathAwareInterface
     */
    setPath(path: PathInterface): PathAwareInterface;
    /**
     * @return PathInterface
     */
    getPath(): PathInterface;
}
