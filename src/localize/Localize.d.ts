import { EventManagerAware, EventManagerAwareInterface } from "../event/index";
/**
 *
 */
export declare class Localize extends EventManagerAware implements EventManagerAwareInterface {
    static CHANGE_LANGUAGE: string;
    /**
     * @type {string}
     */
    private defaultLang;
    /**
     * @type {string[]}
     */
    private languages;
    /**
     * @param defaultLang
     * @param languages
     */
    constructor(defaultLang: any, languages: any);
    /**
     * @param {string} language
     * @return {this}
     */
    setDefaultLang(language: any): this;
    /**
     * @return {string}
     */
    getDefaultLang(): string;
    /**
     * @return {Array<string>}
     */
    getLanguages(): string[];
}
