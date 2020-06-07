import { AclAdapterInterface } from "../AclAdapterInterface";
/**
 * @class
 * @link https://github.com/optimalbits/node_acl
 */
export declare class JsAclAdapter implements AclAdapterInterface {
    /**
     * @type {any}
     */
    protected jsAcl: any;
    /**
     * @param jsAcl
     */
    constructor(jsAcl: any);
    /**
     * @inheritDoc
     */
    isAllowed(role: any, resource: any, privilege: string): boolean;
    /**
     * @inheritDoc
     */
    addResource(resource: any): AclAdapterInterface;
    /**
     * @inheritDoc
     */
    addRole(role: any): AclAdapterInterface;
    /**
     * @inheritDoc
     */
    allow(role: any, resource: any, privilege: any): void;
}
