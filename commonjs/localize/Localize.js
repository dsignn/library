"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../event/index");
/**
 *
 */
class Localize extends index_1.EventManagerAware {
    /**
     * @param defaultLang
     * @param languages
     */
    constructor(defaultLang, languages) {
        super();
        /**
         * @type {string[]}
         */
        this.languages = [];
        this.defaultLang = defaultLang;
        this.languages = languages;
    }
    /**
     * @param {string} language
     * @return {this}
     */
    setDefaultLang(language) {
        if (!this.languages.includes(language)) {
            throw 'Language not found';
        }
        if (language === this.defaultLang) {
            return;
        }
        this.defaultLang = language;
        this.getEventManager().emit(Localize.CHANGE_LANGUAGE, { 'language': this.defaultLang });
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
exports.Localize = Localize;
Localize.CHANGE_LANGUAGE = 'change-language';
