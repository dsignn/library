import {EntityIdentifierInterface, EntityReference} from "./index";

/**
 *
 */
export class EntityNestedReference extends EntityReference implements EntityIdentifierInterface {

    /**
     * @type string
     */
    protected parentId:string;

    /**
     * @return {string}
     */
    getParentId(): string {
        return this.parentId;
    }

    /**
     * @param {string} collection
     * @return {this}
     */
    setParentId(parentId: string) {
        this.parentId = parentId;
        return this;
    }
}