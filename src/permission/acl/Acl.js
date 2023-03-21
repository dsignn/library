import { EventManagerAware } from "../../event/index";
/**
 * @class
 */
class Acl extends EventManagerAware {
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
    isAllowed(role, resource, privilege) {
        return this.adapter.isAllowed(role, resource, privilege);
    }
    /**
     * @inheritDoc
     */
    getRole() {
        return this.role;
    }
    /**
     * @inheritDoc
     */
    setRole(role) {
        if (this.role !== role) {
            this.role = role;
            this.getEventManager().emit(Acl.CHANGE_ROLE, role);
        }
        return this;
    }
    /**
     * @inheritDoc
     */
    addRole(resource) {
        this.adapter.addRole(resource);
        return this;
    }
    /**
     * @inheritDoc
     */
    addResource(resource) {
        this.adapter.addResource(resource);
        return this;
    }
    /**
     * @param role
     * @param resource
     * @param privilege
     */
    allow(role, resource, privilege) {
        this.adapter.allow(role, resource, privilege);
    }
}
Acl.CHANGE_ROLE = 'change-role';
export { Acl };
//# sourceMappingURL=Acl.js.map