import {EntityIdentifier} from "./EntityIdentifier";
import {EntityIdentifierInterface} from "./EntityIdentifierInterface";

/**
 * @class EntityReference
 */
export class EntityReference extends EntityIdentifier implements EntityIdentifierInterface {

    /**
     * @type string
     */
    protected collection:string;

    /**
     * @return {string}
     */
    getCollection(): string {
        return this.collection;
    }

    /**
     * @param {string} collection
     * @return {this}
     */
    setCollection(collection: string) {
        this.collection = collection;
        return this;
    }
}