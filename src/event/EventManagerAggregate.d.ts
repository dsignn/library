import { EventManagerInterface } from "./EventManagerInterface";
import { ListenerInterface } from "./ListenerInterface";
/**
 * @class
 * EventManagerInterface
 */
export declare class EventManagerAggregate implements EventManagerInterface {
    /**
     * @type {object}
     */
    private managers;
    /**
     * @param {EventManagerInterface} eventMangager
     * @retun EventManagerAggregate
     */
    addEventManager(eventMangager: EventManagerInterface): this;
    /**
     * @param {EventManagerInterface} eventMangager
     * @retun EventManagerAggregate
     */
    removeEventManager(eventMangager: EventManagerInterface): this;
    /**
     * @param  {EventManagerInterface} eventMangager
     * @retun boolean
     */
    hasEventManager(eventMangager: EventManagerInterface): boolean;
    /**
     * @param {string} evtName
     * @param listener
     * @return EventManager
     */
    on(evtName: string, listener: any): this;
    /**
     * @param {string} evtName
     * @param {object} params
     * @param {boolean} clearListener
     */
    emit(evtName: string, params: object, clearListener?: boolean): this;
    /**
     *
     * @param {string} evtName
     * @param {ListenerInterface} listener
     * @return {EventManager}
     */
    remove(evtName: string, listener: ListenerInterface): this;
}
