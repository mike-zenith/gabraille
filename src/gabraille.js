"use strict";

import Translator from "./translator";

class Gabraille {
    static Translator(opts) {
        return new Translator(opts);
    }
    constructor(options = {}) {
        this.options = options;
        this.translator = null;
    }
    addLanguage(alias, definitions) {
        if (!this.options.language) {
            this.options.language = {};
        }
        this.options.language[alias] = definitions;
        return alias;
    }
    set language(language) {
        if (Array.isArray(language)) {
            language = this.addLanguage(language[0], language[1]);
        }

        if (this.options && this.options.language[language]) {
            this.lang = language;
        } else {
            throw new Error(`Language not found: ${language}`);
        }
        this.translate.chars = this.options.language[this.lang].chars;
    }
    get language() {
        return this.lang;
    }
    get translate() {
        if (!this.translator) {
            this.translator = Gabraille.Translator();
        }
        return this.translator;
    }
}

module.exports = Gabraille;