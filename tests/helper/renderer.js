"use strict";

var helper = {
    querySelector: function (el, select) {
        return el && el.querySelector(select) || null;
    },
    querySelectorAll: function (el, select) {
        return el && el.querySelectorAll(select) || null;
    }

};


export default helper;