import Renderer from "../src/renderer";
import helper from "./helper/renderer";

describe("Renderer use cases", function () {
    "use strict";

    var subject;
    var document;


    beforeEach(function(){
        document = window.document;
        subject = new Renderer();
    });

    afterEach(function(){
        subject = null;
        document = null;
    });

    it("renders 6-dot braille cell by default", function () {
        var cell = subject.cell();
        expect(helper.querySelectorAll(cell, '.dot').length).toEqual(6);
    });

    it("renders a single d when [[1]] given", function () {
        pending("later");
        var given = [[1]];
        var got = subject.render(given);
        helper.querySelector(got, 'div').length;
    });
});

