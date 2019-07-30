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
}
