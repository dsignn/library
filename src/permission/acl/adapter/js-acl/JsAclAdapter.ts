import {AclAdapterInterface} from "../AclAdapterInterface";
/**
 * @class
 * @link https://github.com/optimalbits/node_acl
 */
export class JsAclAdapter implements AclAdapterInterface {

    /**
     * @type {any}
     */
    protected jsAcl: any;

    /**
     * @param jsAcl
     */
    constructor(jsAcl) {

        this.jsAcl = jsAcl;
    }

    /**
     * @inheritDoc
     */
    isAllowed(role: any, resource: any, privilege: string): boolean {

        try {
            return this.jsAcl.isAllowed(role, resource, privilege);
        } catch (error) {
            console.error(error);
            return false;
        }
    }

    /**
     * @inheritDoc
     */
    addResource(resource: any): AclAdapterInterface {
        this.jsAcl.addResource(resource);
        return this;
    }

    /**
     * @inheritDoc
     */
    addRole(role: any): AclAdapterInterface {
        this.jsAcl.addRole(role);
        return this;
    }


}