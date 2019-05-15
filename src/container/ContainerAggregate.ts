import {ContainerInterface} from './ContainerInterface';
import {ContainerAwareInterface} from "./ContainerAwareInterface";

/**
 * Container
 */
export class ContainerAggregate implements ContainerInterface, ContainerAwareInterface {

    /**
     * @type {ContainerInterface}
     */
    protected container: ContainerInterface;

    /**
     * @type {object}
     */
    protected services: object = {};

    /**
     * @type any
     */
    protected prototipeClass: any;

    /**
     * @inheritDoc
     */
    getContainer() {
        return this.container;
    }

    /**
     * @inheritDoc
     */
    setContainer(container: ContainerInterface) {
        this.container = container;
        return this;
    }

    /**
     * @inheritDoc
     */
    get(id: string) {

        if (typeof this.services[id] === 'function') {
            this.services[id] = this.services[id](this);
        }

        return this.services[id]
    };

    /**
     * @inheritDoc
     */
    getAsync(id: string): Promise<any> {
        return new Promise(function (resolve, reject) {
                /**
                 * Inject container if the service is a callback
                 */
                if (typeof this.services[id] === 'function') {
                    this.services[id] = this.services[id](this);
                }

                resolve(this.services[id]);
            }.bind(this)
        );
    }

    /**
     * @inheritDoc
     */
    public has(id: string) {
        return !!this.services[id];
    };

    /**
     * @inheritDoc
     */
    public set(id: string, service: any) {
        this.services[id] = service;
        if (typeof service !== 'function' && !this.isValid(service)) {
            throw 'Invalid service';
        }
        return this;
    };

    /**
     * @param service
     */
    protected isValid(service) {
        return service instanceof this.prototipeClass;
    }

    /**
     * @param prototipeClass
     * @return {this}
     */
    public setPrototipeClass(prototipeClass: any) {
        this.prototipeClass = prototipeClass;
        return this;
    }
}

