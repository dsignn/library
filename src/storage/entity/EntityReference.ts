import {EntityIdentifierInterface, EntityIdentifier} from "./index";

/**
 *
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