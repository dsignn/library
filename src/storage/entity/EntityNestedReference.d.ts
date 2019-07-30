import { EntityIdentifierInterface, EntityReference } from "./index";
/**
 *
 */
export declare class EntityNestedReference extends EntityReference implements EntityIdentifierInterface {
    /**
     * @type string
     */
    protected parentId: string;
    /**
     * @return {string}
     */
    getParentId(): string;
    /**
     * @param {string} collection
     * @return {this}
     */
    setParentId(parentId: string): this;
}
