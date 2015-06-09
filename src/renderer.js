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
    get cols() {
        return this.options.cell.cols;
    }
    get dots() {
        return this.options.cell.dots;
    }
    get dotPerCol() {
        return Math.ceil(this.dots / this.cols);
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

    dot(brailleDots, CellElement) {
        var dots = 0, dot,
            dotsLen = brailleDots.length,
            dpc = this.dotPerCol;

        var selector, selectCol, selectDot;
        var $dot;

        for(; dots<dotsLen; dots++) {
            dot = brailleDots[dots];
            selectCol = Math.ceil(dot / dpc);
            selectDot = dot > dpc ? dot - dpc : dot;
            selector = ".dot-" + selectCol + '-' + selectDot;
            $dot = CellElement.querySelector(selector);
            if ($dot && $dot.classList) {
                $dot.classList.add('active');
            }
        }
        return CellElement;
    }

    cell() {
        var dpc = this.dotPerCol;
        var cols = this.cols;
        var dots = this.dots;
        var col;
        var dot;

        var $ret = document.createDocumentFragment();
        var addedDots = 0;

        var $cell = this.buildCellElement(cols, dots);
        var $col;

        $ret.appendChild($cell);

        for(col=1;col<=cols;col++) {
            $col = this.buildColElement(col);
            $cell.appendChild($col);
            for(dot=1;dot<=dpc;dot++) {
                if (addedDots > dots) {
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