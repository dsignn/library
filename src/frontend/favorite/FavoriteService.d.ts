import { StorageInterface } from "../../storage/StorageInterface";
import { EventManagerAwareInterface } from "../../event/EventManagerAwareInterface";
import { EventManagerInterface } from "../../event/EventManagerInterface";
/**
 * @class FavoriteService
 */
export declare class FavoriteService implements EventManagerAwareInterface {
    /**
     * @type number
     */
    private storage;
    /**
     * @type object
     */
    private menu;
    /**
     * @type Array
     */
    private favorites;
    /**
     * @param {StorageInterface} storage
     * @param {object} menu
     */
    constructor(storage: StorageInterface, menu: object);
    /**
     * @return {object}
     */
    getMenu(): object;
    /**
     * @param {object} menu
     * @return FavoriteService
     */
    setMenu(menu: object): this;
    /**
     * @private
     */
    _loadFavorites(): void;
    /**
     * @return EventManagerInterface
     */
    getEventManager(): any;
    /**
     * @param eventManager
     */
    setEventManager(eventManager: EventManagerInterface): this;
}
