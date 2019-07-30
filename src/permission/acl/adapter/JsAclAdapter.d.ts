import { AclAdapterInterface } from "./AclAdapterInterface";
/**
 * @class
 * @link https://github.com/optimalbits/node_acl
 */
export declare class JsAclAdapter implements AclAdapterInterface {
    /**
     * @type {any}
     */
    protected acl: any;
    /**
     * @param acl
     */
    constructor(acl: any);
    /**
     * @inheritDoc
     */
    isAllowed(role: any, resource: any, privilege: string): boolean;
}
