import {AclAdapterInterface} from "./AclAdapterInterface";
/**
 * @class
 * @link https://github.com/optimalbits/node_acl
 */
export class OptimalbitsAdapter implements AclAdapterInterface {

    /**
     * @type {any}
     */
    protected acl: any = require('acl');

    /**
     * @param {Array<any>} rules
     */
    constructor(rules : Array<any>) {

        this.acl.allow(rules);
    }

    /**
     * @inheritDoc
     */
    isAllowed(role: any, resource: any, privilege: string): boolean {
        return this.acl(role, resource, privilege);
    }
}