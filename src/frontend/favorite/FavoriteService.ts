import {StorageInterface} from "../../storage/StorageInterface";
import {EventManagerAwareInterface} from "../../event/EventManagerAwareInterface";
import {EventManagerInterface} from "../../event/EventManagerInterface";

/**
 * @class FavoriteService
 */
export class FavoriteService implements EventManagerAwareInterface {


    /**
     * @type number
     */
    private storage: StorageInterface;

    /**
     * @type object
     */
    private menu: object;

    /**
     * @type Array
     */
    private  favorites = [];

    /**
     * @param {StorageInterface} storage
     * @param {object} menu
     */
    constructor(storage: StorageInterface, menu: object) {

        this.storage = storage;

        this.setMenu(menu);
    }

    /**
     * @return {object}
     */
    public getMenu() {
        return this.menu;
    }

    /**
     * @param {object} menu
     * @return FavoriteService
     */
    public setMenu(menu: object) {
        this.menu = menu;
        this._loadFavorites();
        return this;
    }


    /**
     * @private
     */
    _loadFavorites() {
        this.storage.getAll().then((favorites) => {
            if (favorites) {
                this.favorites = favorites;
            }
        });
    }

    /**
     * @return EventManagerInterface
     */
    public getEventManager() {
        return this.storage.getEventManager();
    }

    /**
     * @param eventManager
     */
    public setEventManager(eventManager: EventManagerInterface) {
        this.storage.setEventManager(eventManager);
        return this;
    }
}
