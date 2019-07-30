/**
 * EventManagerInterface
 */
export interface EventManagerInterface {
    /**
     * @param {string} evtName
     * @param fn
     */
    on(evtName: string, fn: any): any;
    /**
     * @param {string} evtName
     * @param {object} params
     * @param {boolean} clearListener
     */
    emit(evtName: string, params: object, clearListener?: boolean): any;
    /**
     *
     * @param {string} evtName
     * @param fn
     */
    remove(evtName: string, fn: any): any;
}
