import Gabraille from "../src/gabraille";

describe("Gabraille use cases", function () {
    "use strict";

    var subject;

    beforeEach(function(){ subject = new Gabraille() });
    afterEach(function(){ subject = null });

    it("translates a single character", function () {
        subject.language = ["hu/HU",{
            chars: {
                "á": [[4, 8],[4]]
            }
        }];
        var got = subject.translate.char("á");
        var expected = [[4,8],[4]];
        expect(got).toEqual(expected);
    });

    it("translates a series of characters", function () {
        subject.language = ["hu/HU",{
            chars: {
                "á": [[4, 8],[4]],
                "a": [[1]]
            }
        }];
        var got = subject.translate.sequence("áaáaáa");
        var expected = [[[4, 8],[4]],[[1]],[[4, 8],[4]],[[1]],[[4, 8],[4]],[[1]]];
        expect(got).toEqual(expected);
    });

    it("is able to switch between languages", function () {
        var got, expected;

        subject.addLanguage("hu/HU", { chars: { "a": [[1]] }});
        subject.addLanguage("en/US", { chars: { "a": [[2]] }});

        subject.language = "hu/HU";
        got = subject.translate.char("a");
        expected = [[1]];
        expect(got).toEqual(expected);

        subject.language = "en/US";
        got = subject.translate.char("a");
        expected = [[2]];
        expect(got).toEqual(expected);
    });

    it("handles multi-char letters when translating a char", function () {
        subject.language = ["hu/HU", { chars: { "a": [[1]], "b": [[2]], "ab": [[3,4]] } } ];

        var got = subject.translate.char("ab");
        var expected = [[3,4]];

        expect(got).toEqual(expected);
    });

    it("handles multi-char letters when translating a sequence", function () {
        subject.addLanguage("hu/HU", { chars: { "a": [[1]], "b": [[2]], "ab": [[3,4]] } } );
        subject.language = "hu/HU";

        var got = subject.translate.sequence("ab{ab}");
        var expected = [ [[1]], [[2]], [[3,4]] ];

        expect(got).toEqual(expected);
    });

    it("translates multi-line text", function () {
        subject.language = ["hu/HU", { chars: { "a": [[1]], "b": [[2]], "c": [[3]], " ": [[0]] } } ];

        var got = subject.translate.sequence(
            `aa
            bb
            cc`);

        var expected = [ [[1]], [[1]], [[0]], [[2]], [[2]], [[0]], [[3]], [[3]] ];
        expect(got).toEqual(expected);
    });

    it("has option to eliminate whitespace", function () {
        subject.language = ["hu/HU", { chars: { "a": [[1]], "b": [[2]], "c": [[3]], " ": [[0]] } } ];

        var got = subject.translate.setEliminateWhitespace().sequence(
            `aa bb
              cc`);

        var expected = [ [[1]], [[1]], [[2]], [[2]], [[3]], [[3]] ];
        expect(got).toEqual(expected);
    });


});