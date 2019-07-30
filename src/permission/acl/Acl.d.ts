import { AclInterface } from "./AclInterface";
import { AclAdapterInterface } from "./adapter/index";
import { EventManagerInterface } from "../../event/index";
/**
 * @class
 */
export declare class Acl implements AclInterface {
    static CHANGE_ROLE: string;
    /**
     * @type AclAdapterInterface
     */
    protected adapter: AclAdapterInterface;
    /**
     * @type EventManagerInterface
     */
    protected eventManager: EventManagerInterface;
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
     * @param {EventManagerInterface} eventManager
     * @return {this}
     */
    setEventManager(eventManager: EventManagerInterface): this;
    /**
     * @return {EventManagerInterface}
     */
    getEventManager(): EventManagerInterface;
}
