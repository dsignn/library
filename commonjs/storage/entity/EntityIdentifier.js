"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EntityIdentifier = void 0;
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
