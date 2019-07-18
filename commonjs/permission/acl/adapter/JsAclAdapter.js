"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @class
 * @link https://github.com/optimalbits/node_acl
 */
class JsAclAdapter {
    /**
     * @param acl
     */
    constructor(acl) {
        this.acl = acl;
    }
    /**
     * @inheritDoc
     */
    isAllowed(role, resource, privilege) {
        try {
            return this.acl.isAllowed(role, resource, privilege);
        }
        catch (error) {
            console.error(error);
            return false;
        }
    }
}
exports.JsAclAdapter = JsAclAdapter;
