import { AclInterface } from "./AclInterface";
import { AclAdapterInterface } from "./adapter/index";
import { EventManagerAware } from "../../event/index";
/**
 * @class
 */
export declare class Acl extends EventManagerAware implements AclInterface {
    static CHANGE_ROLE: string;
    /**
     * @type AclAdapterInterface
     */
    protected adapter: AclAdapterInterface;
    /**
     * @type any
     */
    protected role: any;
    /**
     * @param adapter
     */
    constructor(adapter: any);
    /**
     * @inheritDoc
     */
    isAllowed(role: any, resource: any, privilege: string): boolean;
    /**
     * @inheritDoc
     */
    getRole(): any;
    /**
     * @inheritDoc
     */
    setRole(role: any): Acl;
    /**
     * @inheritDoc
     */
    addRole(resource: any): AclInterface;
    /**
     * @inheritDoc
     */
    addResource(resource: any): AclInterface;
    /**
     * @param role
     * @param resource
     * @param privilege
     */
    allow(role: any, resource: any, privilege: any): void;
}
