Gabraille 
===

Any language to braille translator. es6 test project

Install
```
npm install
npm test
```

Usage
```javascript
// take a look at tests/usecase.*.js

var gabraille = new Gabraille();
gabraille.language = ['hu/HU', { chars: { a: [[1]] } }];
var brailleChars = gabraille.translate.sequence('a a a');

// brailleChars = [ [[1]], [[1]], [[1]]  ]

var htmlrenderer = new Renderer();
// renders dots into the given cell
var HTMLElementCell = htmlrenderer.dots(brailleChars[0][0], htmlrenderer.cell());
/*
<div class="cell cell-2-6">
  <div class="col col-1">
    <div class="dot dot-1-1 active"></div>
    <div class="dot dot-1-2"></div>
    <div class="dot dot-1-3"></div>
  </div>
  <div class="col col-2">
    <div class="dot dot-2-1"></div>
    <div class="dot dot-2-2"></div>
    <div class="dot dot-2-3"></div>
  </div>  
</div>
*/

// renders the whole sequence
var HTMLElementSequence = htmlrenderer.render(brailleChars);
```

Features
===
* es6: classes, generators, arrow functions, ..
* set up multiple languages (`gabraille.addLanguage`) and toggle active with `gabraille.language`
* use separator `{`, `}` to divide multi letter characters in a sequence, like: `match -> mat{ch}`
* eliminiate whitespaces from sequence: `reduce` into 1 space, or `eliminate all`
* basic renderer without a DOM manipulator library
* `Translator` and `Renderer` can be swapped even in runtime

Todo
====
* renderer.sequence
* renderer configuration: element type/cell,col,dot + classes and attributes
* negative tests
* builds: es6/es5/node.js
* travis integration
* ready to accept contributions
* live example page
