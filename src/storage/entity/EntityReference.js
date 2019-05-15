import { EntityIdentifier } from "./index";
/**
 *
 */
export class EntityReference extends EntityIdentifier {
    /**
     * @return {string}
     */
    getCollection() {
        return this.collection;
    }
    /**
     * @param {string} collection
     * @return {this}
     */
    setCollection(collection) {
        this.collection = collection;
        return this;
    }
}
//# sourceMappingURL=EntityReference.js.map