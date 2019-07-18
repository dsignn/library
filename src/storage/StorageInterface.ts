import {EntityIdentifierInterface} from "./entity";
import {HydratorAwareInterface} from "../hydrator/HydratorAwareInterface";
import {EventManagerAwareInterface} from "../event/EventManagerAwareInterface";
/**
 *
 */
export interface StorageInterface extends HydratorAwareInterface, EventManagerAwareInterface {

    /**
     * @param {string} id
     * @return {Promise<any>}
     */
    get(id: string) : Promise<any>;

    /**
     * @param {EntityIdentifierInterface} entity
     * @return {Promise<any>}
     */
    save(entity: EntityIdentifierInterface) : Promise<any>;

    /**
     * @param {EntityIdentifierInterface} entity
     * @return {Promise<any>}
     */
    update(entity: EntityIdentifierInterface) : Promise<any>;

    /**
     * @param {EntityIdentifierInterface} entity
     * @return {Promise<any>}
     */
    delete(entity: EntityIdentifierInterface) : Promise<any>;

    /**
     * @param {object} filter
     * @return {Promise<any>}
     */
    getAll(filter?: object) : Promise<any>;

    /**
     * @param {number} page
     * @param {number} itemCount
     * @param {object} filter
     * @return {Promise<any>}
     */
    getPaged(page: number, itemCount: number, filter?: object) : Promise<any>;
}
