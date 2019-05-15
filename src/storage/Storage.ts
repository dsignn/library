import {EntityIdentifierInterface} from "./entity";
import {StorageAdapterInterfaceInterface} from "./adapter";
import {EventManagerAwareInterface} from "../event/EventManagerAwareInterface";
import {EventManager} from "../event/EventManager";
import {EventManagerInterface} from "../event/EventManagerInterface";
import {HydratorAwareInterface, HydratorInteface} from "../hydrator";
import {StorageInterface} from "./StorageInterface";
import {IdGeneratorInterface, MongoIdGenerator} from "./util";
/**
 *
 */
export class Storage implements HydratorAwareInterface, EventManagerAwareInterface, StorageInterface {

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
     * @type StorageAdapterInterfaceInterface
     */
    private adapter: StorageAdapterInterfaceInterface;

    /**
     * @type {EventManagerInterface}
     */
    protected eventManager:EventManagerInterface = new EventManager();

    /**
     * @type {HydratorAwareInterface}
     */
    protected hydrator:HydratorInteface;

    /**
     * @type {IdGeneratorInterface}
     */
    protected idGenerator: IdGeneratorInterface = new MongoIdGenerator();

    /**
     * @param {StorageAdapterInterfaceInterface} adapter
     */
    constructor(adapter: StorageAdapterInterfaceInterface) {
        /**
         * @type {StorageAdapterInterfaceInterface}
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
     * @return {HydratorInteface}
     */
    public getHydrator(): HydratorInteface {
        return this.hydrator;
    }

    /**
     * @param {HydratorInteface} hydrator
     */
    public setHydrator(hydrator: HydratorInteface) {
        this.hydrator = hydrator;
        return this;
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

    getAll(filter: object): Promise<any> {
        return new Promise((resolve, reject) => {
            this.adapter.getAll(filter)
                .then((result) => {
                    // TODO add this logic in the pagination class
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

    getPaged(page: number, itemCount: number, filter: object): Promise<any> {
        return new Promise((resolve, reject) => {
            this.adapter.getPaged(page, itemCount, filter)
                .then((result) => {
                    // TODO add this logic in the pagination class
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
    delete(entity: EntityIdentifierInterface): Promise<any> {
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
    save(entity: EntityIdentifierInterface): Promise<any> {
        entity.setId(this.idGenerator.generateId());

        return new Promise((resolve, reject) => {

            this.getEventManager().emit(Storage.BEFORE_SAVE, entity);
            let data = this.hydrator ? this.hydrator.extract(entity) : entity;
            this.adapter.save(data)
                .then(
                    (data) => {
                        this.getEventManager().emit(Storage.POST_SAVE, entity);
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
    update(entity: EntityIdentifierInterface): Promise<any> {
        return new Promise((resolve, reject) => {

            this.getEventManager().emit(Storage.BEFORE_UPDATE, entity);
            let data = this.hydrator ? this.hydrator.extract(entity) : entity;
            this.adapter.update(data)
                .then(
                    (data) => {
                        this.getEventManager().emit(Storage.POST_UPDATE, entity);
                        resolve(entity);
                    }
                ).catch(
                (err) => {
                    reject(err);
                })
        });
    }

    /**
     * @param {IdGeneratorInterface} idGenerator
     */
    setIdGenerator(idGenerator: IdGeneratorInterface) {
        this.idGenerator = idGenerator;
        return this;
    }
}