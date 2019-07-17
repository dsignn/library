/**
 * @class
 * @link https://github.com/optimalbits/node_acl
 */
export class OptimalbitsAdapter {
    /**
     * @param {Array<any>} rules
     */
    constructor(rules) {
        const acl = require('acl');
        this.acl = new acl(new acl.memoryBackend());
        this.acl.allow(rules);
    }
    /**
     * @inheritDoc
     */
    isAllowed(role, resource, privilege) {
        return this.acl.isAllowed(role, resource, privilege);
    }
}
//# sourceMappingURL=OptimalbitsAdapter.js.map