import { PathAwareInterface } from "../path/PathAwareInterface";
/**
 * @interface ComponentInterface
 */
export interface ComponentInterface extends PathAwareInterface {
    /**
     * @return {string}
     */
    getName(): string;
    /**
     * @param {string} name
     * @return ComponentInterface
     */
    setName(name: string): ComponentInterface;
}
