"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @class
 * @link https://github.com/optimalbits/node_acl
 */
class OptimalbitsAdapter {
    /**
     * @param {Array<any>} rules
     */
    constructor(rules) {
        /**
         * @type {any}
         */
        this.acl = require('acl');
        this.acl.allow(rules);
    }
    /**
     * @inheritDoc
     */
    isAllowed(role, resource, privilege) {
        return this.acl(role, resource, privilege);
    }
}
exports.OptimalbitsAdapter = OptimalbitsAdapter;
