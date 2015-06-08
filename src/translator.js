"use strict";

function isWhitespace(char) {
    return char.match(/(\s|\r|\n)+/);
}

class Translator {
    static defaults() {
        return {
            eliminateWhitespace: 'reduce'
        }
    };

    constructor(opts = {}) {
        this.options = Object.assign({}, Translator.defaults(), opts);
    }
    set chars(chrs) {
        this.options.chars = chrs;
    }
    get chars() {
        return this.options.chars;
    }
    set eliminateWhitespace(value) {
        if (~['reduce', false, true].indexOf(value)) {
            this.options.eliminateWhitespace = value;
        } else {
            throw Error("EliminiateWhitespace got invalid value: accepts 'reduce', true, false");
        }
    }
    get eliminateWhitespace() {
        return this.options.eliminateWhitespace;
    }

    setEliminateWhitespace(value = true) {
        this.eliminateWhitespace = value;
        return this;
    }

    char(chr) {
        if (!this.options.chars) {
            return null;
        }
        if (this.options.chars.hasOwnProperty(chr)) {
            if (!Array.isArray(this.options.chars[chr]) ||
                !Array.isArray(this.options.chars[chr][0])) {
                this.options.chars[chr] = [ this.options.chars[chr] ];
            }
            return this.options.chars[chr];
        }

        return null;
    }

    charsReader(sequence, separators = ["{", "}"]) {
        var len = sequence.length, i = 0;
        return function* () {
            var letter = null,
                char
                ;
            for(;i<len;i++) {
                char = sequence[i];
                if (char === separators[0]) {
                    letter = "";
                } else if (char === separators[1]) {
                    yield letter;
                    letter = null;
                } else {
                    if (letter !== null ) {
                        letter += char;
                    } else {
                        yield char;
                    }
                }
            }
        };
    }

    eliminate(char) {
        return isWhitespace(char) && this.eliminateWhitespace || false;
    }

    sequence(chars) {
        var result = [];
        var generator = this.charsReader(chars);
        var lastWhitespace = false;
        var eliminate;

        for (let char of generator()) {
            eliminate = this.eliminate(char);
            if (eliminate) {
                if (eliminate === true) {
                    continue;
                }
                char = " ";
                if (lastWhitespace) {
                    continue;
                }
                lastWhitespace = true;
            } else {
                lastWhitespace = false;
            }
            result.push(this.char(char));
        }
        return result;
    }

}

module.exports = Translator;