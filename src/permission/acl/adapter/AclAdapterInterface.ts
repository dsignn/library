/**
 * @interface
 */
export interface AclAdapterInterface {

    /**
     * @param role
     * @param resource
     * @param {string} privilege
     * @return boolean
     */
    isAllowed(role : any, resource: any, privilege: string) : boolean;

    /**
     * @param role
     * @return AclAdapterInterface
     */
    addRole(role : any): AclAdapterInterface;

    /**
     * @param role
     * @return AclAdapterInterface
     */
    addResource(resource : any): AclAdapterInterface;

    /**
     *
     * @param role
     * @param resource
     * @param privilege
     */
    allow(role: any, resource: any, privilege: any): void;
}