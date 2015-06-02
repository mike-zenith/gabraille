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
            d: [ 1,2 ]
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

    it("reads chars using separator from generator", function () {
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

});

describe("Translator: text", function () {
    "use strict";

    var subject;
    var options = {
        chars: {
            a: [[1]],
            b: [[2]],
            c: [[3]]
        }
    };

    beforeEach(function () {
        subject = new Translator(options);
    });

    afterEach(function () {
        subject = null;
    });

});