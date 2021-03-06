import {ContainerInterface} from './ContainerInterface';

/**
 * @class
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
    public get(id: string) {

        if (typeof this.services[id] === 'function') {
            this.services[id] = this.services[id](this);
        }

        return this.services[id]
    };

    /**
     *
     * @inheritDoc
     */
    public getAsync(id: string): Promise<any> {
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

        return this;
    };
}

