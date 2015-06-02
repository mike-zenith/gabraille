import Gabraille from "../src/gabraille";
import Translator from "../src/translator";

describe("Gabraille: init", function () {
    "use strict";

    it("exists: Gabraille", function () {
        expect(Gabraille).toBeDefined();
    });

    it("can be constructed", function () {
        var dummy = new Gabraille();
        expect(dummy instanceof Gabraille).toBeTruthy();
    });

    it("saves the given options", function () {
        var opts = {
            dummyData: {}
        };
        var dummy = new Gabraille(opts);
        expect(dummy.options).toBe(opts);
    });

    it("imports Translator as static", function () {
        expect(Gabraille.Translator() instanceof Translator).toBeTruthy();
    });

    it("allows setting translator", function () {
        var translator = {
            'char': function (a) {
                return 'b';
            }
        };
        var dummy = new Gabraille();
        dummy.translator = translator;
        expect(dummy.translator).toBe(translator);
        expect(dummy.translate.char('a')).toBe('b');
    })
});


describe("Gabraille: settings", function () {
    "use strict";

    it("accepts langauge preset by alias", function () {
        var options = {
            "language": {
                "alias": {}
            }
        };
        var dummy = new Gabraille(options);
        dummy.language = "alias";

        expect(dummy.language).toEqual("alias");
    });

    it("throws error when language preset is not set", function () {
        var options = {
            "language": {
                "alias": {}
            }
        };
        var setLang = function () {
            var dummy = new Gabraille(options);
            dummy.language = "puk";
        };

        expect(setLang).toThrowError(/not found/);
    });

    it("accepts setting language with definitions as an array", function () {
        var dummy = new Gabraille();
        dummy.language = ["alias", { chars: { a: [[1]]} }];
        var expected = [[1]];
        var got = dummy.translate.char("a");
        expect(got).toEqual(expected);
    });

});

describe("Gabraille: language processor", function () {
    "use strict";

    var subject;
    var options = {
        "language": {
            "t1" : {
                "chars": {
                    "a": [[1,2,3]]
                }
            },
            "t2" : {
                "chars": {
                    "b": [[1,3]]
                }
            }
        }
    };

    beforeEach(function () {
        subject = new Gabraille(options);
    });

    afterEach(function () {
        subject = null;
    });

    it("reads definition by character", function () {
        subject.language = "t1";
        var expected = [[1,2,3]];
        expect(subject.translate.char("a")).toEqual(expected);
    });

    it("reset chars on translator when changing language", function () {
        subject.language = "t1";
        subject.translate.char("a");
        subject.language = "t2";
        var expected = [[1,3]];
        expect(subject.translate.char("b")).toEqual(expected);
    });

});