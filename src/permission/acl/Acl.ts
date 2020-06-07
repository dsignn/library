import {AclInterface} from "./AclInterface";
import {AclAdapterInterface} from "./adapter/index";
import {EventManager, EventManagerInterface, EventManagerAware} from "../../event/index";

/**
 * @class
 */
export class Acl extends EventManagerAware implements AclInterface {

    public static CHANGE_ROLE = 'change-role';

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

    constructor(adapter) {
        super();
        this.adapter = adapter;
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
     * @inheritDoc
     */
    addRole(resource: any): AclInterface {
        this.adapter.addRole(resource);
        return this;
    }

    /**
     * @inheritDoc
     */
    addResource(resource: any): AclInterface {
        this.adapter.addResource(resource);
        return this;
    }

    /**
     * @param role
     * @param resource
     * @param privilege
     */
    allow(role: any, resource: any, privilege: any): void {
        this.adapter.allow(role, resource, privilege);
    }
}