import { EntityIdentifierInterface } from "./entity";
import { StorageAdapterAwareInterface, StorageAdapterInterface } from "./adapter/index";
import { EventManagerInterface } from "../event/index";
import { HydratorInterface } from "../hydrator";
import { StorageInterface } from "./StorageInterface";
/**
 *
 */
export declare class Storage implements StorageInterface, StorageAdapterAwareInterface {
    /**
     * Constants
     */
    static BEFORE_SAVE: string;
    static POST_SAVE: string;
    static BEFORE_UPDATE: string;
    static POST_UPDATE: string;
    static BEFORE_REMOVE: string;
    static POST_REMOVE: string;
    static BEFORE_GET: string;
    static POST_GET: string;
    /**
     * @type StorageAdapterInterface
     */
    private adapter;
    /**
     * @type {EventManagerInterface}
     */
    protected eventManager: EventManagerInterface;
    /**
     * @type {HydratorAwareInterface}
     */
    protected hydrator: HydratorInterface;
    protected test: any;
    string: any;
    /**
     * @param {StorageAdapterInterface} adapter
     */
    constructor(adapter: StorageAdapterInterface);
    /**
     * @param {EventManagerInterface} eventManager
     * @return {this}
     */
    setEventManager(eventManager: EventManagerInterface): this;
    /**
     * @return {EventManagerInterface}
     */
    getEventManager(): EventManagerInterface;
    /**
     * @return {HydratorInterface}
     */
    getHydrator(): HydratorInterface;
    /**
     * @param {HydratorInterface} hydrator
     */
    setHydrator(hydrator: HydratorInterface): this;
    /**
     * @inheritDoc
     */
    setAdapter(adapter: StorageAdapterInterface): this;
    /**
     * @inheritDoc
     */
    getAdapter(): StorageAdapterInterface;
    /**
     * @inheritDoc
     */
    get(id: string): Promise<any>;
    getAll(filter?: object): Promise<any>;
    getPaged(page: number, itemCount: number, filter?: object): Promise<any>;
    /**
     * @inheritDoc
     */
    delete(entity: EntityIdentifierInterface): Promise<any>;
    /**
     * @inheritDoc
     */
    save(entity: EntityIdentifierInterface): Promise<any>;
    /**
     * @inheritDoc
     */
    update(entity: EntityIdentifierInterface): Promise<any>;
}
