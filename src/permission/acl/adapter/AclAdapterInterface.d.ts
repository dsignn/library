/**
 * @interface
 */
export interface AclAdapterInterface {
    /**
     * @param role
     * @param resource
     * @param {string} privilege
     */
    isAllowed(role: any, resource: any, privilege: string): boolean;
}
