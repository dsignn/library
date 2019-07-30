import { ContainerInterface } from './ContainerInterface';
/**
 * Container
 */
export declare class Container implements ContainerInterface {
    /**
     * @type {object}
     */
    protected services: object;
    /**
     * @inheritDoc
     */
    get(id: string): any;
    /**
     *
     * @inheritDoc
     */
    getAsync(id: string): Promise<any>;
    /**
     * @inheritDoc
     */
    has(id: string): boolean;
    /**
     * @inheritDoc
     */
    set(id: string, service: any): this;
}
