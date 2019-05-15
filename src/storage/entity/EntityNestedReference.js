import { EntityReference } from "./index";
/**
 *
 */
export class EntityNestedReference extends EntityReference {
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
//# sourceMappingURL=EntityNestedReference.js.map