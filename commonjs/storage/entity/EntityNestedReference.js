"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
/**
 *
 */
class EntityNestedReference extends index_1.EntityReference {
    /**
     * @return {string}
     */
    getParentId() {
        return this.parentId;
    }
    /**
     * @param {string} collection
     * @return {this}
     */
    setParentId(parentId) {
        this.parentId = parentId;
        return this;
    }
}
exports.EntityNestedReference = EntityNestedReference;
