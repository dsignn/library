"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsAclAdapter = void 0;
/**
 * @class
 * @link https://github.com/optimalbits/node_acl
 */
class JsAclAdapter {
    /**
     * @param jsAcl
     */
    constructor(jsAcl) {
        this.jsAcl = jsAcl;
    }
    /**
     * @inheritDoc
     */
    isAllowed(role, resource, privilege) {
        try {
            return this.jsAcl.isAllowed(role, resource, privilege);
        }
        catch (error) {
            console.error(error);
            return false;
        }
    }
    /**
     * @inheritDoc
     */
    addResource(resource) {
        this.jsAcl.addResource(resource);
        return this;
    }
    /**
     * @inheritDoc
     */
    addRole(role) {
        this.jsAcl.addRole(role);
        return this;
    }
    /**
     * @inheritDoc
     */
    allow(role, resource, privilege) {
        this.jsAcl.allow(role, resource, privilege);
    }
}
exports.JsAclAdapter = JsAclAdapter;
