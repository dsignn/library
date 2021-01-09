import { StorageInterface } from "../../storage/StorageInterface";
import { EventManagerAwareInterface } from "../../event/EventManagerAwareInterface";
import { EventManagerInterface } from "../../event/EventManagerInterface";
import { EntityIdentifierInterface } from "../../storage/entity";
/**
 * @class FavoriteService
 */
export declare class FavoriteService implements EventManagerAwareInterface {
    /**
     * Constants
     */
    static RESET_FAVORITES: string;
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
     * @type string
     */
    private identifier;
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
    /**
     * @param {EntityIdentifierInterface} menuItem
     * @return {FavoriteService}
     */
    addFavorite(menuItem: EntityIdentifierInterface): this;
    /**
     * @param {EntityIdentifierInterface} menuItem
     * @return {FavoriteService}
     */
    removeFavorite(menuItem: EntityIdentifierInterface): this;
    /**
     * @param {EntityIdentifierInterface} favorite
     * @return Promise<any>
     */
    upsertFavorite(favorite: EntityIdentifierInterface): Promise<any>;
    /**
     * @param {EntityIdentifierInterface} menuItem
     */
    hasFavorite(menuItem: EntityIdentifierInterface): boolean;
    /**
     * @param menuItem
     */
    getFavorite(menuItem: EntityIdentifierInterface): any;
    /**
     * @return Array
     */
    getFavorites(): Promise<any>;
    /**
     * @param menuItem
     */
    deleteFavorite(menuItem: EntityIdentifierInterface): Promise<any>;
    /**
     * @return {number}
     */
    getAmount(): number;
    /**
     * @return {string}
     */
    getRestaurantId(): any;
    /**
     *
     * @param identifier
     */
    setIdentifier(identifier: string): void;
    /**
     *
     */
    resetFavorites(): void;
}
