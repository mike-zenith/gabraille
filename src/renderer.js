"use strict";


class Renderer {
    constructor(opts = {}) {
        var defaults = {
            cell: {
                cols: 2,
                dots: 6
            }
        };
        this.options = Object.assign(defaults, opts);
    }

    buildElement(type, attributes = {}) {
        var el = document.createElement(type);
        Object.keys(attributes).forEach(attrib => el.setAttribute(attrib, attributes[attrib]));
        return el;
    }

    buildCellElement(cols, dots) {
        return this.buildElement('div', {
            "class":  "cell cell-"+cols+"-"+dots,
            "data-cols": cols,
            "data-dots": dots
        });
    }

    buildColElement(col) {
        return this.buildElement('div', {
            "class": "col col-"+col,
            "data-col": col
        });
    }

    buildDotElement(col, dot) {
        return this.buildElement('div', {
            "class": "dot dot-"+col+"-"+dot,
            "data-col": col,
            "data-dot": dot
        });
    }

    cell() {
        var dpc = this.options.cell.dots;
        var cols = this.options.cell.cols;
        var dots = Math.ceil(dpc / cols);
        var col;
        var dot;

        var $ret = document.createDocumentFragment();
        var addedDots = 0;

        var $cell = this.buildCellElement(cols, dots);
        var $col;

        $ret.appendChild($cell);

        for(col=0;col<cols;col++) {
            $col = this.buildColElement(col);
            $cell.appendChild($col);
            for(dot=0;dot<dots;dot++) {
                if (addedDots >= dpc) {
                    break;
                }
                $col.appendChild( this.buildDotElement(col, dot) );
                addedDots ++;
            }
        }

        return $ret;
    }
}

module.exports = Renderer;