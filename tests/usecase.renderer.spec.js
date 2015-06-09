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

    it("adds active class to the matching dot when given [1]", function () {
        var cell = subject.cell();
        var dots = [1];
        var got = subject.dot(dots, cell);
        var gotActive = helper.querySelectorAll(got, '.active');
        expect(gotActive.length).toEqual(1);
        expect(gotActive[0]).toBe(helper.querySelector(got, '.dot:first-child'));
    });

    it("adds active class to the matching dot when given [2]", function () {
        var cell = subject.cell();
        var dots = [2];
        var got = subject.dot(dots, cell);
        var gotActive = helper.querySelectorAll(got, '.active');
        expect(gotActive.length).toEqual(1);
        expect(gotActive[0]).toBe(helper.querySelector(got, '.col-1 .dot-1-2'));
    });

    it("adds active class to the matching dot when given [3]", function () {
        var cell = subject.cell();
        var dots = [3];
        var got = subject.dot(dots, cell);
        var gotActive = helper.querySelectorAll(got, '.active');
        expect(gotActive.length).toEqual(1);
        expect(gotActive[0]).toBe(helper.querySelector(got, '.col-1 .dot-1-3'));
    });

    it("adds active class to the matching dot when given [4]", function () {
        var cell = subject.cell();
        var dots = [4];
        var got = subject.dot(dots, cell);
        var gotActive = helper.querySelectorAll(got, '.active');
        expect(gotActive.length).toEqual(1);
        expect(gotActive[0]).toBe(helper.querySelector(got, '.col-2 .dot-2-1'));
    });

    it("adds active class to the matching dot when given [5]", function () {
        var cell = subject.cell();
        var dots = [5];
        var got = subject.dot(dots, cell);
        var gotActive = helper.querySelectorAll(got, '.active');
        expect(gotActive.length).toEqual(1);
        expect(gotActive[0]).toBe(helper.querySelector(got, '.col-2 .dot-2-2'));
    });

    it("adds active class to the matching dot when given [6]", function () {
        var cell = subject.cell();
        var dots = [6];
        var got = subject.dot(dots, cell);
        var gotActive = helper.querySelectorAll(got, '.active');
        expect(gotActive.length).toEqual(1);
        expect(gotActive[0]).toBe(helper.querySelector(got, '.col-2 .dot-2-3'));
    });

    it("adds active class to multiple dots", function () {
        var cell = subject.cell();
        var dots = [1, 2, 5];
        var got = subject.dot(dots, cell);
        var gotActive = helper.querySelectorAll(got, '.active');
        expect(gotActive.length).toEqual(3);
        expect(gotActive[0]).toBe(helper.querySelector(got, '.col-1 .dot-1-1'));
        expect(gotActive[1]).toBe(helper.querySelector(got, '.col-1 .dot-1-2'));
        expect(gotActive[2]).toBe(helper.querySelector(got, '.col-2 .dot-2-2'));
    });
});

