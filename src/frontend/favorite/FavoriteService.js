/**
 * @class FavoriteService
 */
export class FavoriteService {
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
        }
        this.storage.update(favorite);
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
     */
    upsertFavorite(favorite) {
        this.storage.update(favorite);
    }
    /**
     * @param {EntityIdentifierInterface} menuItem
     */
    hasFavorite(menuItem) {
        return this.favorites.findIndex((element) => {
            return element.id === menuItem["id"];
        }) > -1;
    }
    /**
     * @param menuItem
     */
    getFavorite(menuItem) {
        return this.favorites.find((element) => {
            return element.id === menuItem["id"];
        });
    }
    /**
     *
     */
    getFavorites() {
        return this.storage.getAll({
            restaurantId: this.menu["organization"]["id"]
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
        if (!this.menu['organization'] || !this.menu['organization']['_id']) {
            throw new Error('Restaurant id not found');
        }
        return this.menu['organization']['_id'];
    }
}
//# sourceMappingURL=FavoriteService.js.map