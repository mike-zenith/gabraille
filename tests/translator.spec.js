import Translator from "../src/translator";

describe("Translator: init", function () {
    "use strict";

    it("exists: Translator", function () {
        expect(Translator).toBeDefined();
    });

    it("can be constructed", function () {
        var dummy = new Translator();
        expect(dummy instanceof Translator).toBeTruthy();
    });
});

describe("Translator: settings", function () {
    "use strict";

    it("accepts language definitions", function () {
        var opts = {
            chars: {
                a: [[1,2,3]]
            }
        };
        var expected = [[1,2,3]];
        var dummy = new Translator(opts);
        expect(dummy.char('a')).toEqual(expected);
    });

    it("allows setting language definitions", function () {
        var opts = {
            chars: {
                a: [[1,2,3]]
            }
        };
        var dummy = new Translator(opts);
        var changed = {
            chars: {
                a: [[2,3,4]]
            }
        };
        dummy.chars = changed.chars;
        var expected = [[2,3,4]];
        expect(dummy.char('a')).toEqual(expected);

    });

    it("allows changing lang definitions when the options is empty", function () {
        var subject = new Translator();
        var opts = {
            chars: {
                a: [[1,2,3]],
                b: [[2,3,4]]
            }
        };
        subject.chars = opts.chars;
        var expecteda = [[1,2,3]];
        var expectedb = [[2,3,4]];

        expect(subject.char("a")).toEqual(expecteda);
        expect(subject.char("b")).toEqual(expectedb);

    });

    it("uses static defaults method to determine default values", function () {
        var before = Translator.defaults;
        var called = false;

        Translator.defaults = function () {
            called = true;
        };

        var dummy = new Translator();
        expect(called).toEqual(true);

        Translator.defaults = before;
    });

    it("sets 'eliminateWhitespace' by default to 'reduce'", function () {
        var dummy = new Translator();
        expect(dummy.eliminateWhitespace).toEqual('reduce');
    });

    it('only accepts true, false and reduce as a value of eliminateWhitespace', function () {
        var dummy = new Translator();
        function test() {
            dummy.eliminateWhitespace = true;
            dummy.eliminateWhitespace = false;
            dummy.eliminateWhitespace = 'reduce';
        }
        expect(test).not.toThrow();
    });

    it('throws error when eliminateWhitespace is invalid', function () {
        var dummy = new Translator();
        function test() {
            dummy.eliminateWhitespace = 'bullshit';
        }
        expect(test).toThrowError(/invalid/);
    });

    it("merges given options with defaults", function () {
        var before = Translator.defaults;
        Translator.defaults = function () {
            return {
                'flaffy': 'fluffy'
            }
        };

        var given = {
            'fluffy': true
        };
        var expected = {
            'fluffy': true,
            'flaffy': 'fluffy'
        };

        var dummy = new Translator(given);

        expect(dummy.options).toEqual(expected);

        Translator.defaults = before;
    });

    it("allows chaining when calling 'setEliminateWhitespace'", function () {
        function run() {
            var dummy = new Translator();
            var opts = dummy.setEliminateWhitespace(true).options;
            expect(opts).toEqual(dummy.options);
        }

        expect(run).not.toThrow();
    });

    it("uses 'true' as the default value when calling setEliminateWhitespace", function () {
        var dummy = new Translator();
        expect(dummy.setEliminateWhitespace().eliminateWhitespace).toEqual(true);
    });

    it("allows using 'eliminateWhitespace' setter and getter", function () {
        function run() {
            var dummy = new Translator();
            dummy.eliminateWhitespace = 'reduce';
            expect(dummy.eliminateWhitespace).toEqual('reduce');
        }

        expect(run).not.toThrow();
    });

    it("uses setter 'eliminateWhitespace' when calling 'setEliminateWhitespace'", function () {
        var given = false;
        var dummy = new Translator();
        Object.defineProperties(dummy, {
            "eliminateWhitespace": {
                set: function (val) {
                    given = val;
                }
            }
        });

        dummy.setEliminateWhitespace('pukk');
        expect(given).toEqual('pukk');
    });
});

describe("Translator: char definitions", function () {
    "use strict";
    var subject;
    var options = {
        chars: {
            a: [ [1,2,3] ],
            b: [ [1,2], [2,3] ],
            c: [ [1,4], [1,4], [1,4] ],
            d: [ 1,2 ],
            cs: [ [2,3], [2,3] ]
        }
    };

    beforeEach(function () {
        subject = new Translator(options);
    });

    afterEach(function () {
        subject = null;
    });

    it("reads 1 sign char definitions", function () {
        var expected = [ [1,2,3] ];
        expect(subject.char('a')).toEqual(expected);
    });

    it("reads 2 sign char definitions", function () {
        var expected = [ [1,2], [2,3] ];
        expect(subject.char('b')).toEqual(expected);
    });

    it("reads 3 sign char definitions", function () {
        var expected = [ [1,4], [1,4], [1,4] ];
        expect(subject.char('c')).toEqual(expected);
    });

    it("returns null when no char definition found", function () {
        expect(subject.char("-")).toEqual(null);
    });

    it("reads and transforms char definitions when its not array in array", function () {
        var transformed = [[ 1, 2 ]];
        expect(subject.char('d')).toEqual(transformed);
    });

    it("reads multi-char letters as char", function () {
        var expected = [ [2,3], [2,3] ];
        expect(subject.char("cs")).toEqual(expected);
    });

});

describe("Translator: sequence", function () {
    "use strict";

    var subject;
    var options = {
        chars: {
            a: [ [1,2,3] ],
            b: [ [1,2], [2,3] ],
            c: [ [1,4], [1,4], [1,4] ],
            d: [ 1,2 ],
            " ": [ [0] ]
        }
    };

    beforeEach(function () {
        subject = new Translator(options);
    });

    afterEach(function () {
        subject = null;
    });

    it("translates character sequences", function () {
        var input = "abc";
        var expected = [ [[1,2,3]], [[1,2],[2,3]], [ [1,4], [1,4], [1,4] ] ];
        var got = subject.sequence(input);

        expect(got).toEqual(expected);
    });

    it("reads chars from generator", function () {
        var chars = "abc";
        var got = "";
        var generator = subject.charsReader(chars);
        for (let x of generator()) {
            got += x;
        }

        expect(got).toEqual(chars);
    });

    it("reads chars (using separator) from generator", function () {
        var separator = ["{", "}"];
        var chars = "{ab}c";
        var expected = "abc";
        var got = "";
        var generator = subject.charsReader(chars, separator);
        for (let x of generator()) {
            got += x;
        }

        expect(got).toEqual(expected);
    });

    it("reads white space (1 char, space)", function () {
        var chars = "a b c";
        var expected = [ [ [1,2,3] ], [[0]], [ [1,2], [2,3] ], [[0]], [ [1,4], [1,4], [1,4] ] ];

        expect(subject.sequence(chars)).toEqual(expected);
    });

    it("reads multiple white spaces as 1 char", function () {
        var chars = "a  b        c";
        var expected = [ [ [1,2,3] ], [[0]], [ [1,2], [2,3] ], [[0]], [ [1,4], [1,4], [1,4] ] ];

        expect(subject.sequence(chars)).toEqual(expected);
    });

    it("uses option to eliminate multiple whitespace", function () {
        subject.setEliminateWhitespace();

        var chars = "a  b        c";
        var expected = [ [ [1,2,3] ], [ [1,2], [2,3] ], [ [1,4], [1,4], [1,4] ] ];

        expect(subject.sequence(chars)).toEqual(expected);
    });

    it("uses eliminateWhitespace 'false' option", function () {
        subject.setEliminateWhitespace(false);

        var chars = "a  b  c";
        var expected = [ [ [1,2,3] ], [[0]], [[0]], [ [1,2], [2,3] ], [[0]], [[0]], [ [1,4], [1,4], [1,4] ] ];

        expect(subject.sequence(chars)).toEqual(expected);

    });

    it("uses eliminateWhitespace 'reduce' option", function () {
        subject.setEliminateWhitespace('reduce');

        var chars = "a  b  c";
        var expected = [ [ [1,2,3] ], [[0]], [ [1,2], [2,3] ], [[0]], [ [1,4], [1,4], [1,4] ] ];

        expect(subject.sequence(chars)).toEqual(expected);
    });

});