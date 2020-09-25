"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EntityReference = void 0;
const EntityIdentifier_1 = require("./EntityIdentifier");
/**
 * @class EntityReference
 */
class EntityReference extends EntityIdentifier_1.EntityIdentifier {
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
exports.EntityReference = EntityReference;
