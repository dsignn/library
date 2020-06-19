import {PathInterface} from "./PathInterface";
import {PathAwareInterface} from "./PathAwareInterface";

/**
 * @class PathAware
 */
export class PathAware implements PathAwareInterface{

    /**
     * @type PathInterface
     */
    protected path: PathInterface;

    /**
     * @param {PathInterface} path
     * @return PathAwareInterface
     */
    public setPath(path : PathInterface): PathAwareInterface {

        this.path = path;
        return this;
    }

    /**
     * @return PathInterface
     */
    public getPath(): PathInterface {
        return  this.path
    }
}