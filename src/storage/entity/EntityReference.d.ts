import { EntityIdentifierInterface, EntityIdentifier } from "./index";
/**
 *
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
