import {ContainerInterface} from './ContainerInterface';

/**
 * Container
 */
export class Container implements ContainerInterface {

    /**
     * @type {object}
     */
    protected services: object = {};

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
     *
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
    has(id: string) {
        return !!this.services[id];
    };

    /**
     * @inheritDoc
     */
    set(id: string, service: any) {
        this.services[id] = service;

        return this;
    };
}

