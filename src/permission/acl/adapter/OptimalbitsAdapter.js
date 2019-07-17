/**
 * @class
 * @link https://github.com/optimalbits/node_acl
 */
export class OptimalbitsAdapter {
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
//# sourceMappingURL=OptimalbitsAdapter.js.map