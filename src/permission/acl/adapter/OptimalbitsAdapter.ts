import {AclAdapterInterface} from "./AclAdapterInterface";
/**
 * @class
 * @link https://github.com/optimalbits/node_acl
 */
export class OptimalbitsAdapter implements AclAdapterInterface {

    /**
     * @type {any}
     */
    protected acl: any;

    /**
     * @param {Array<any>} rules
     */
    constructor(rules : Array<any>) {

        const acl = require('acl');
        this.acl = new acl(new acl.memoryBackend());
        this.acl.allow(rules);
    }

    /**
     * @inheritDoc
     */
    isAllowed(role: any, resource: any, privilege: string): boolean {
        return this.acl.isAllowed(role, resource, privilege);
    }
}