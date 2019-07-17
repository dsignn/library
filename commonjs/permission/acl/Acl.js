"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../../event/index");
/**
 * @class
 */
class Acl {
    /**
     * @param adapter
     */
    constructor(adapter) {
        this.adapter = adapter;
        this.setEventManager(new index_1.EventManager());
    }
    /**
     * @inheritDoc
     */
    isAllowed(role, resource, privilege) {
        return null;
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
        if (role !== role) {
            this.getEventManager().emit(Acl.CHANGE_ROLE, role);
        }
        this.role = role;
        return this;
    }
    /**
     * @param {EventManagerInterface} eventManager
     * @return {this}
     */
    setEventManager(eventManager) {
        this.eventManager = eventManager;
        return this;
    }
    /**
     * @return {EventManagerInterface}
     */
    getEventManager() {
        return this.eventManager;
    }
}
Acl.CHANGE_ROLE = 'change-role';
exports.Acl = Acl;
