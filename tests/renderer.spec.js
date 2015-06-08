import Renderer from "../src/renderer";
import helper from "./helper/renderer";

describe("Renderer: init", function () {
    "use strict";

    it("exists: Renderer", function () {
        expect(Renderer).toBeDefined();
    });

    it("can be constructed", function () {
        var dummy = new Renderer();
        expect(dummy instanceof Renderer).toBeTruthy();
    });

    it("saves the given options", function () {
        var opts = {
            dummyData: {
                foo: 'bar'
            }
        };
        var dummy = new Renderer(opts);
        expect(dummy.options.dummyData).toBe(opts.dummyData);
    });
});

describe("Renderer: settings", function () {
    "use strict";

    it("has 'cell' default option", function () {
        var dummy = new Renderer();
        expect(dummy.options.cell).toBeTruthy();
    });

    it("has dots and cols in options.cell", function () {
        var dummy = new Renderer();
        expect(dummy.options.cell.dots).toBeTruthy();
        expect(dummy.options.cell.cols).toBeTruthy();
    });

    it("allows overwriting options.cell via options", function () {
        var dummy = new Renderer({ cell: { dots: 2 }});
        expect(dummy.options.cell.dots).toEqual(2);
        var dummy = new Renderer({ cell: { cols: 1 }});
        expect(dummy.options.cell.cols).toEqual(1);
    });
});

describe("Renderer: cell", function () {
    "use strict";

    it("returns DocumentFragment", function () {
        var dummy = new Renderer();
        expect(dummy.cell()).toEqual(jasmine.any(DocumentFragment));
    });

    it("returns the given col number of .col Element", function () {
        var dummy = new Renderer({ cell: { cols:2, dots: 6}});
        var got = dummy.cell();

        expect(helper.querySelectorAll(got, '.col').length).toEqual(2);
    });

    it("returns the given dot number of .dot Element", function () {
        var dummy = new Renderer({ cell: { cols:2, dots: 6}});
        var got = dummy.cell();

        expect(helper.querySelectorAll(got, '.dot').length).toEqual(6);
    });

    it("divides dots into cols", function () {
        var dummy = new Renderer({ cell: { cols:2, dots: 6}});
        var got = dummy.cell();

        expect(helper.querySelectorAll(got, '.col:first-child .dot').length).toEqual(3);
    });

    it("calls buildColElement, buildDotElement, buildCellElement", function () {
        var dummy = new Renderer();
        spyOn(dummy, 'buildColElement').and.callThrough();
        spyOn(dummy, 'buildDotElement').and.callThrough();
        spyOn(dummy, 'buildCellElement').and.callThrough();

        dummy.cell();
        expect(dummy.buildColElement).toHaveBeenCalled();
        expect(dummy.buildDotElement).toHaveBeenCalled();
        expect(dummy.buildCellElement).toHaveBeenCalled();
    });

});

describe("Renderer build Element methods", function () {
    "use strict";

    var subject;
    beforeEach(function () {
        subject = new Renderer();
    });
    afterEach(function () {
        subject = null;
    });


});
