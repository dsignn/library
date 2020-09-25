import { EntityIdentifier } from "./EntityIdentifier";
import { EntityIdentifierInterface } from "./EntityIdentifierInterface";
/**
 * @class EntityReference
 */
export declare class EntityReference extends EntityIdentifier implements EntityIdentifierInterface {
    /**
     * @type string
     */
    protected collection: string;
    /**
     * @return {string}
     */
    getCollection(): string;
    /**
     * @param {string} collection
     * @return {this}
     */
    setCollection(collection: string): this;
}
