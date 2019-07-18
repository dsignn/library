import {AclAdapterInterface} from "./AclAdapterInterface";
/**
 * @class
 * @link https://github.com/optimalbits/node_acl
 */
export class JsAclAdapter implements AclAdapterInterface {

    /**
     * @type {any}
     */
    protected acl: any;

    /**
     * @param acl
     */
    constructor(acl) {

        this.acl = acl;
    }

    /**
     * @inheritDoc
     */
    isAllowed(role: any, resource: any, privilege: string): boolean {

        try {
            return this.acl.isAllowed(role, resource, privilege);
        } catch (error) {
            console.error(error);
            return false;
        }
    }
}