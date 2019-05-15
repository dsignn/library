"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
/**
 *
 */
class EntityReference extends index_1.EntityIdentifier {
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
