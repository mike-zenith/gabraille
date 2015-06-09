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

    it("returns the given col number of .col HTMLElement", function () {
        var dummy = new Renderer({ cell: { cols:2, dots: 6}});
        var got = dummy.cell();

        expect(helper.querySelectorAll(got, '.col').length).toEqual(2);
    });

    it("returns the given dot number of .dot HTMLElement", function () {
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

describe("Renderer: build Element methods", function () {
    "use strict";

    var subject;
    beforeEach(function () {
        subject = new Renderer();
    });
    afterEach(function () {
        subject = null;
    });

    it("buildCellElement: returns HTMLElement with 'cell' class", function () {
        var got = subject.buildCellElement(1, 1);
        expect(got).toEqual(jasmine.any(HTMLElement));
        expect(got.getAttribute('class')).toMatch(/cell/);
    });

    it("buildColElement: returns HTMLElement with 'col' class", function () {
        var got = subject.buildColElement(1);
        expect(got).toEqual(jasmine.any(HTMLElement));
        expect(got.getAttribute('class')).toMatch(/col/);
    });

    it("buildDotElement: returns HTMLElement with 'dot' class", function () {
        var got = subject.buildDotElement(1, 1);
        expect(got).toEqual(jasmine.any(HTMLElement));
        expect(got.getAttribute('class')).toMatch(/dot/);
    });

    it("buildDotElement: returns HTMLElement with 'dot-${col}-${dot}' class", function () {
        var got = subject.buildDotElement(1, 1);
        expect(got).toEqual(jasmine.any(HTMLElement));
        expect(got.getAttribute('class')).toMatch(/dot-1-1/);

        var got = subject.buildDotElement(2, 3);
        expect(got.getAttribute('class')).toMatch(/dot-2-3/);
    });

});

describe("Renderer: dot() method", function () {
    "use strict";

    var subject;
    var cell;

    beforeEach(function () {
        subject = new Renderer();
        cell = subject.cell();
    });
    afterEach(function () {
        subject = null;
    });

    it("adds 1 .active class to the first dot when calling with [1]", function () {
        var dots = [1];
        var got = subject.dot(dots, cell);
        var gotActive = helper.querySelectorAll(got, '.active');
        expect(gotActive.length).toEqual(1);
        expect(gotActive[0]).toBe(helper.querySelector(got, '.dot:first-child'));
    });

    it("adds 1 .active class to the 2nd dot in the 1st col when calling with [2]", function () {
        var dots = [2];
        var got = subject.dot(dots, cell);
        var gotActive = helper.querySelectorAll(got, '.active');
        expect(gotActive.length).toEqual(1);
        expect(gotActive[0]).toBe(helper.querySelector(got, '.col-1 .dot-1-2'));
    });

    it("adds 1 .active class to the 3rd dot in the 1st col when calling with [3]", function () {
        var dots = [3];
        var got = subject.dot(dots, cell);
        var gotActive = helper.querySelectorAll(got, '.active');
        expect(gotActive.length).toEqual(1);
        expect(gotActive[0]).toBe(helper.querySelector(got, '.col-1 .dot-1-3'));
    });

    it("adds 1 .active class to the 1st dot in the 2nd col when calling with [4]", function () {
        var dots = [4];
        var got = subject.dot(dots, cell);
        var gotActive = helper.querySelectorAll(got, '.active');
        expect(gotActive.length).toEqual(1);
        expect(gotActive[0]).toBe(helper.querySelector(got, '.col-2 .dot-2-1'));
    });

    it("adds 1 .active class to the 2nd dot in the 2nd col when calling with [5]", function () {
        var dots = [5];
        var got = subject.dot(dots, cell);
        var gotActive = helper.querySelectorAll(got, '.active');
        expect(gotActive.length).toEqual(1);
        expect(gotActive[0]).toBe(helper.querySelector(got, '.col-2 .dot-2-2'));
    });

    it("adds 1 .active class to the 3rd dot in the 2nd col when calling with [6]", function () {
        var dots = [6];
        var got = subject.dot(dots, cell);
        var gotActive = helper.querySelectorAll(got, '.active');
        expect(gotActive.length).toEqual(1);
        expect(gotActive[0]).toBe(helper.querySelector(got, '.col-2 .dot-2-3'));
    });

});