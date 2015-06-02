"use strict";

class Translator {
    constructor(opts = {}) {
        this.options = opts;
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
    set chars(chrs) {
        this.options.chars = chrs;
    }
    get chars() {
        return this.options.chars;
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

    sequence(chars) {
        var result = [];
        var generator = this.charsReader(chars);
        for (let char of generator()) {
            result.push(this.char(char));
        }
        return result;
    }

}

module.exports = Translator;