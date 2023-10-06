import {EntityIdentifierInterface} from "./entity";
import {StorageAdapterAwareInterface, StorageAdapterInterface} from "./adapter/index";
import {EventManagerInterface} from "../event/index";
import {EventManager} from "../event/EventManager";
import {HydratorAwareInterface, HydratorInterface} from "../hydrator";
import {StorageInterface} from "./StorageInterface";

/**
 *
 */
export class Storage implements StorageInterface, StorageAdapterAwareInterface {

    /**
     * Constants
     */
    public static BEFORE_SAVE = "after-save";

    public static POST_SAVE = "post-save";

    public static BEFORE_UPDATE = "after-update";

    public static POST_UPDATE = "post-update";

    public static BEFORE_REMOVE = "after-remove";

    public static POST_REMOVE = "post-remove";

    public static BEFORE_GET = "after-get";

    public static POST_GET = "post-get";

    /**
     * @type StorageAdapterInterface
     */
    private adapter: StorageAdapterInterface;

    /**
     * @type {EventManagerInterface}
     */
    protected eventManager:EventManagerInterface = new EventManager();

    /**
     * @type {HydratorAwareInterface}
     */
    protected hydrator:HydratorInterface;


    protected test; string;

    /**
     * @param {StorageAdapterInterface} adapter
     */
    constructor(adapter: StorageAdapterInterface) {
        /**
         * @type {StorageAdapterInterface}
         */
        this.adapter = adapter;
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

    /**
     * @return {HydratorInterface}
     */
    public getHydrator(): HydratorInterface {
        return this.hydrator;
    }

    /**
     * @param {HydratorInterface} hydrator
     */
    public setHydrator(hydrator: HydratorInterface) {
        this.hydrator = hydrator;
        return this;
    }

    /**
     * @inheritDoc
     */
    public setAdapter(adapter: StorageAdapterInterface) {
        this.adapter = adapter;
        return this;
    }

    /**
     * @inheritDoc
     */
    public getAdapter() {
        return this.adapter;
    }

    /**
     * @inheritDoc
     */
    get(id: string): Promise<any> {
        return new Promise((resolve, reject) => {
            this.adapter.get(id)
                .then((data) => {
                    // TODO add event
                    resolve(this.getHydrator() ? this.getHydrator().hydrate(data) : data)
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }

    public getAll(filter?: object): Promise<any> {
        return new Promise((resolve, reject) => {
            this.adapter.getAll(filter)
                .then((result) => {
                    if (this.getHydrator()) {
                        for (let cont = 0; result.length > cont; cont++) {
                            result[cont] = this.hydrator ? this.hydrator.hydrate(result[cont]) : result[cont];
                        }
                    }

                    resolve(result);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }

    public getPaged(page: number, itemCount: number, filter?: object): Promise<any> {
        return new Promise((resolve, reject) => {
            this.adapter.getPaged(page, itemCount, filter)
                .then((result) => {
                    if (this.getHydrator()) {
                        for (let cont = 0; result.length > cont; cont++) {
                            result[cont] = this.hydrator ? this.hydrator.hydrate(result[cont]) : result[cont];
                        }
                    }
                    resolve(result);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }

    /**
     * @inheritDoc
     */
    public delete(entity: EntityIdentifierInterface): Promise<any> {
        return new Promise((resolve, reject) => {
            this.getEventManager().emit(Storage.BEFORE_REMOVE, entity);
            this.adapter.remove(entity)
                .then((data) => {
                    this.getEventManager().emit(Storage.POST_REMOVE, entity);
                    resolve(entity)
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }

    /**
     * @inheritDoc
     */
    public save(entity: EntityIdentifierInterface): Promise<any> {
        return new Promise((resolve, reject) => {

            this.getEventManager().emit(Storage.BEFORE_SAVE, entity);
            let data = this.hydrator ? this.hydrator.extract(entity) : entity;
            this.adapter.save(data)
                .then(
                    (data) => {
                        this.getEventManager().emit(Storage.POST_SAVE, entity);
                        entity = this.hydrator ? this.hydrator.hydrate(data) : entity;
                        resolve(entity);
                    }
                ).catch(
                (err) => {
                    reject(err);
                })
        });
    }

    /**
     * @inheritDoc
     */
    public update(entity: EntityIdentifierInterface): Promise<any> {
        return new Promise((resolve, reject) => {

            this.getEventManager().emit(Storage.BEFORE_UPDATE, entity);
            let data = this.hydrator ? this.hydrator.extract(entity) : entity;
            this.adapter.update(data)
                .then(
                    (data) => {
                        this.getEventManager().emit(Storage.POST_UPDATE, entity);
                        entity = this.hydrator ? this.hydrator.hydrate(data) : entity;
                        resolve(entity);
                    }
                ).catch(
                (err) => {
                    reject(err);
                })
        });
    }
}
