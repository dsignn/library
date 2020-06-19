import {PathInterface} from "./PathInterface";

/**
 * @interface PathAwareInterface
 */
export interface PathAwareInterface {

    /**
     * @param {PathInterface} path
     * @return PathAwareInterface
     */
    setPath(path : PathInterface): PathAwareInterface;

    /**
     * @return PathInterface
     */
    getPath(): PathInterface
}