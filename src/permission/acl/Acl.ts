import {AclInterface} from "./AclInterface";
import {AclAdapterInterface} from "./adapter/index";
import {EventManager, EventManagerInterface} from "../../event/index";

/**
 * @class
 */
export class Acl implements AclInterface {

    public static CHANGE_ROLE = 'change-role';

    /**
     * @type AclAdapterInterface
     */
    protected adapter: AclAdapterInterface;

    /**
     * @type EventManagerInterface
     */
    protected eventManager : EventManagerInterface;


    /**
     * @type any
     */
    protected role: any;

    /**
     * @param adapter
     */

    constructor(adapter) {
        this.adapter = adapter;

        this.setEventManager(new EventManager());
    }

    /**
     * @inheritDoc
     */
    isAllowed(role: any, resource: any, privilege: string): boolean {
        return this.adapter.isAllowed(role, resource, privilege);
    }

    /**
     * @inheritDoc
     */
    getRole(): any {
        return this.role;
    }

    /**
     * @inheritDoc
     */
    setRole(role : any): Acl {
        if (this.role !== role) {
            this.role = role;
            this.getEventManager().emit(Acl.CHANGE_ROLE, role)
        }
        return this;
    }

    /**
     * @param {EventManagerInterface} eventManager
     * @return {this}
     */
    public setEventManager(eventManager:EventManagerInterface) {
        this.eventManager = eventManager;
        return this;
    }

    /**
     * @return {EventManagerInterface}
     */
    public getEventManager() {
        return this.eventManager;
    }
}