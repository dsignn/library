"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FavoriteService = void 0;
/**
 * @class FavoriteService
 */
class FavoriteService {
    /**
     * @param {StorageInterface} storage
     * @param {object} menu
     */
    constructor(storage, menu) {
        /**
         * @type Array
         */
        this.favorites = [];
        this.storage = storage;
        this.setMenu(menu);
    }
    /**
     * @return {object}
     */
    getMenu() {
        return this.menu;
    }
    /**
     * @param {object} menu
     * @return FavoriteService
     */
    setMenu(menu) {
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
    getEventManager() {
        return this.storage.getEventManager();
    }
    /**
     * @param eventManager
     */
    setEventManager(eventManager) {
        this.storage.setEventManager(eventManager);
        return this;
    }
}
exports.FavoriteService = FavoriteService;
