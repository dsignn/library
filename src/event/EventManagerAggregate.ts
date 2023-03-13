import {EventManagerInterface} from "./EventManagerInterface"
import {ListenerInterface} from "./ListenerInterface";

/**
 * @class
 * EventManagerInterface
 */
export class EventManagerAggregate implements EventManagerInterface {

    /**
     * @type {object}
     */
    private managers: Object = {};

    /**
     * @param {EventManagerInterface} eventMangager
     * @retun EventManagerAggregate
     */
    addEventManager(eventMangager: EventManagerInterface) {
        let key = eventMangager.constructor.name;
        this.managers[key] = eventMangager;

        return this;
    }

    /**
     * @param {EventManagerInterface} eventMangager
     * @retun EventManagerAggregate
     */
    removeEventManager(eventMangager: EventManagerInterface) {
        let key = eventMangager.constructor.name;
        if(this.managers[key]) {
            delete this.managers[key];
        }

        return this;
    }

    /**
     * @param  {EventManagerInterface} eventMangager
     * @retun boolean
     */
    hasEventManager(eventMangager: EventManagerInterface) {
        let key = eventMangager.constructor.name;
        return !!this.managers[key];
    }

    /**
     * @param {string} evtName
     * @param listener
     * @return EventManager
     */
    on(evtName: string, listener: any) {
        
        for (const property in this.managers) {
            this.managers[property].on(evtName, listener)
        }

        return this;
    }

    /**
     * @param {string} evtName
     * @param {object} params
     * @param {boolean} clearListener
     */
    emit(evtName: string, params: object, clearListener: boolean = false) {

        for (const property in this.managers) {
            this.managers[property].emit(evtName, params, clearListener);
        }

        return this;
    }

    /**
     *
     * @param {string} evtName
     * @param {ListenerInterface} listener
     * @return {EventManager}
     */
    remove(evtName: string,  listener: ListenerInterface) {
      
        for (const property in this.managers) {
            this.managers[property].remove(evtName, listener);
        }

        return this;
    }
}