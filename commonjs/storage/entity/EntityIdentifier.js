"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 *
 */
class EntityIdentifier {
    /**
     * @inheritDoc
     */
    getId() {
        return this.id;
    }
    /**
     * @inheritDoc
     */
    setId(id) {
        this.id = id;
        return this;
    }
}
exports.EntityIdentifier = EntityIdentifier;
