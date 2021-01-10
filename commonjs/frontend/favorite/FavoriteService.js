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
        /**
         * @type string
         */
        this.identifier = '_id';
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
        this.getFavorites().then((favorites) => {
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
    /**
     * @param {EntityIdentifierInterface} menuItem
     * @return {FavoriteService}
     */
    addFavorite(menuItem) {
        let favorite;
        let newFavorite = false;
        if (this.hasFavorite(menuItem)) {
            favorite = this.getFavorite(menuItem);
            favorite.totalCount++;
        }
        else {
            favorite = menuItem;
            favorite.totalCount = 1;
            favorite.currentCount = 0;
            favorite.restaurantId = this.getRestaurantId();
            this.favorites.push(favorite);
            newFavorite = true;
        }
        this.storage.update(favorite).then((data) => {
            if (newFavorite) {
                this.getEventManager().emit(FavoriteService.NEW_FAVORITES, data);
            }
        });
        return this;
    }
    /**
     * @param {EntityIdentifierInterface} menuItem
     * @return {FavoriteService}
     */
    removeFavorite(menuItem) {
        if (this.hasFavorite(menuItem)) {
            let favorite = this.getFavorite(menuItem);
            if (favorite.totalCount > 0) {
                favorite.totalCount--;
                if (favorite.currentCount > favorite.totalCount) {
                    favorite.currentCount = favorite.totalCount;
                }
                this.upsertFavorite(favorite);
            }
        }
        return this;
    }
    /**
     * @param {EntityIdentifierInterface} favorite
     * @return Promise<any>
     */
    upsertFavorite(favorite) {
        return this.storage.update(favorite);
    }
    /**
     * @param {EntityIdentifierInterface} menuItem
     */
    hasFavorite(menuItem) {
        return this.favorites.findIndex((element) => {
            return element[this.identifier] === menuItem[this.identifier];
        }) > -1;
    }
    /**
     * @param menuItem
     */
    getFavorite(menuItem) {
        return this.favorites.find((element) => {
            return element[this.identifier] === menuItem[this.identifier];
        });
    }
    /**
     * @return Array
     */
    getFavorites() {
        return this.storage.getAll({
            restaurantId: this.menu["organization"][this.identifier]
        });
    }
    /**
     * @param menuItem
     */
    deleteFavorite(menuItem) {
        return this.storage.delete(menuItem);
    }
    /**
     * @return {number}
     */
    getAmount() {
        let amount = 0;
        for (let index = 0; this.favorites.length > index; index++) {
            amount = amount + (this.favorites[index].price.value * this.favorites[index].totalCount);
        }
        return amount;
    }
    /**
     * @return {string}
     */
    getRestaurantId() {
        if (!this.menu['organization'] || !this.menu['organization'][this.identifier]) {
            throw new Error('Restaurant id not found');
        }
        return this.menu['organization'][this.identifier];
    }
    /**
     *
     * @param identifier
     */
    setIdentifier(identifier) {
        this.identifier = identifier;
    }
    /**
     *
     */
    resetFavorites() {
        this.getFavorites().then((data) => {
            console.log('reset', data);
            let favorites = [];
            for (let index = 0; data.length > index; index++) {
                data[index].currentCount = 0;
                favorites.push(this.upsertFavorite(data[index]));
            }
            Promise.all(favorites).then((data) => {
                this.getEventManager().emit(FavoriteService.RESET_FAVORITES, data);
            });
        });
    }
}
exports.FavoriteService = FavoriteService;
/**
 * Constants
 */
FavoriteService.RESET_FAVORITES = "reset-favorites";
/**
 * Constants
 */
FavoriteService.NEW_FAVORITES = "new-favorites";
