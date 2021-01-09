import {StorageInterface} from "../../storage/StorageInterface";
import {EventManagerAwareInterface} from "../../event/EventManagerAwareInterface";
import {EventManagerInterface} from "../../event/EventManagerInterface";
import {EntityIdentifierInterface} from "../../storage/entity";

/**
 * @class FavoriteService
 */
export class FavoriteService implements EventManagerAwareInterface {

    /**
     * Constants
     */
    public static RESET_FAVORITES = "reset-favorites";

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
    private favorites = [];

    /**
     * @type string
     */
    private identifier = '_id';

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
        this.getFavorites().then((favorites) => {
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

    /**
     * @param {EntityIdentifierInterface} menuItem
     * @return {FavoriteService}
     */
    public addFavorite(menuItem: EntityIdentifierInterface) {
        let favorite;
        if (this.hasFavorite(menuItem)) {
            favorite = this.getFavorite(menuItem);
            favorite.totalCount++;
        } else {
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
    public removeFavorite(menuItem: EntityIdentifierInterface) {
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
    public upsertFavorite(favorite: EntityIdentifierInterface): Promise<any> {
        return  this.storage.update(favorite);
    }

    /**
     * @param {EntityIdentifierInterface} menuItem
     */
    public hasFavorite(menuItem: EntityIdentifierInterface): boolean {
        return this.favorites.findIndex((element) => {
            return element[this.identifier] === menuItem[this.identifier];
        }) > -1;
    }

    /**
     * @param menuItem
     */
    public getFavorite(menuItem: EntityIdentifierInterface) {
        return this.favorites.find((element) => {
            return element[this.identifier] === menuItem[this.identifier];
        });
    }

    /**
     * @return Array
     */
    public getFavorites(): Promise<any> {
        return this.storage.getAll({
            restaurantId: this.menu["organization"][this.identifier]
        })
    }

    /**
     * @param menuItem
     */
    public deleteFavorite(menuItem: EntityIdentifierInterface) {
        return this.storage.delete(menuItem);
    }

    /**
     * @return {number}
     */
    public getAmount()  {
        let amount = 0;
        for (let index = 0; this.favorites.length > index; index++) {
            amount = amount + (this.favorites[index].price.value * this.favorites[index].totalCount);
        }

        return amount
    }

    /**
     * @return {string}
     */
    public getRestaurantId() {
        if (!this.menu['organization'] || !this.menu['organization'][this.identifier]) {
            throw new Error('Restaurant id not found')
        }
        return this.menu['organization'][this.identifier];
    }

    /**
     *
     * @param identifier
     */
    public setIdentifier(identifier: string) {
        this.identifier = identifier;
    }

    /**
     *
     */
    public resetFavorites() {
        this.getFavorites().then((data) => {
            console.log('reset', data);
            let favorites =  [];
            for (let index = 0; data.length > index; index++) {
                data[index].currentCount = 0;
                favorites.push(this.upsertFavorite(data[index]));
            }

            Promise.all(favorites).then((data) => {
                this.getEventManager().emit(FavoriteService.RESET_FAVORITES, data);
            })
        });
    }
}
