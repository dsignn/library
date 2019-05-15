import {EventManagerAware, EventManagerAwareInterface} from "../event/index";

/**
 *
 */
export class Localize extends EventManagerAware implements EventManagerAwareInterface {

    static CHANGE_LANGUAGE = 'change-language';

    /**
     * @type {string}
     */
    private defaultLang:string;

    /**
     * @type {string[]}
     */
    private languages:Array<string> = [];

    /**
     * @param defaultLang
     * @param languages
     */
    constructor(defaultLang, languages) {
        super();

        this.defaultLang = defaultLang;

        this.languages = languages;
    }

    /**
     * @param {string} language
     * @return {this}
     */
    setDefaultLang(language) {
        if (!this.languages.includes(language)) {
            throw 'Language not found'
        }

        if(language === this.defaultLang) {
            return
        }

        this.defaultLang = language;
        this.getEventManager().emit(Localize.CHANGE_LANGUAGE, {'language': this.defaultLang});
        return this;
    }

    /**
     * @return {string}
     */
    getDefaultLang() {
        return this.defaultLang;
    }

    /**
     * @return {Array<string>}
     */
    getLanguages() {
        return this.languages;
    }
}
