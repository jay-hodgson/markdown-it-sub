# markdown-it-sub-alt

[![NPM version](https://img.shields.io/npm/v/markdown-it-sub-alt.svg?style=flat)](https://www.npmjs.org/package/markdown-it-sub-alt)
)

> Subscript (`<sub>`) tag plugin for [markdown-it](https://github.com/markdown-it/markdown-it) markdown parser.

__v1.+ requires `markdown-it` v4.+, see changelog.__

`H~2~0` => `H<sub>2</sub>O`

Markup is based on [pandoc](http://johnmacfarlane.net/pandoc/README.html#superscripts-and-subscripts) definition. But nested markup is currently not supported.

Forked from [upstream](https://github.com/markdown-it/markdown-it-sub) to allow unescaped whitespace within delimiters (still must be in the same line).

## Install

node.js, browser:

```bash
npm install markdown-it-sub-alt --save
bower install markdown-it-sub-alt --save
```

## Use

```js
var md = require('markdown-it')()
            .use(require('markdown-it-sub-alt'));

md.render('Challenge~Phase 1~') // => '<p>Challenge<sub>Phase 1</sub></p>'
```

_Differences in browser._ If you load script directly into the page, without
package system, module will add itself globally as `window.markdownitSub`.


## License

[MIT](https://github.com/markdown-it/markdown-it-sub-alt/blob/master/LICENSE)
