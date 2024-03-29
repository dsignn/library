"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Acl = void 0;
const index_1 = require("../../event/index");
/**
 * @class
 */
class Acl extends index_1.EventManagerAware {
    /**
     * @param adapter
     */
    constructor(adapter) {
        super();
        this.adapter = adapter;
    }
    /**
     * @inheritDoc
     */
    isAllowed(role, resource, privilege) {
        return this.adapter.isAllowed(role, resource, privilege);
    }
    /**
     * @inheritDoc
     */
    getRole() {
        return this.role;
    }
    /**
     * @inheritDoc
     */
    setRole(role) {
        if (this.role !== role) {
            this.role = role;
            this.getEventManager().emit(Acl.CHANGE_ROLE, role);
        }
        return this;
    }
    /**
     * @inheritDoc
     */
    addRole(resource) {
        this.adapter.addRole(resource);
        return this;
    }
    /**
     * @inheritDoc
     */
    addResource(resource) {
        this.adapter.addResource(resource);
        return this;
    }
    /**
     * @param role
     * @param resource
     * @param privilege
     */
    allow(role, resource, privilege) {
        this.adapter.allow(role, resource, privilege);
    }
}
Acl.CHANGE_ROLE = 'change-role';
exports.Acl = Acl;
