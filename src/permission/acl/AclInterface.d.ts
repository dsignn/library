/**
 * @interface
 */
export interface AclInterface {
    /**
     * @param role
     * @param resource
     * @param {string} privilege
     */
    isAllowed(role: any, resource: any, privilege: string): boolean;
    /**
     * @return {any}
     */
    getRole(): any;
    /**
     * @param role
     * @return {AclInterface}
     */
    setRole(role: any): AclInterface;
    /**
     *
     * @param role
     * @param resource
     * @param privilege
     */
    allow(role: any, resource: any, privilege: any): void;
    /**
     * @param role
     * @return {AclInterface}
     */
    addRole(role: any): AclInterface;
    /**
     * @param role
     * @return {AclInterface}
     */
    addResource(resource: any): AclInterface;
}
