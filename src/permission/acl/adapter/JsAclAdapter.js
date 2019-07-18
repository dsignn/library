/**
 * @class
 * @link https://github.com/optimalbits/node_acl
 */
export class JsAclAdapter {
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
//# sourceMappingURL=JsAclAdapter.js.map