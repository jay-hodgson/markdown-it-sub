// Process ~subscript~

'use strict';

// same as UNESCAPE_MD_RE plus a space
var UNESCAPE_RE = /\\([ \\!"#$%&'()*+,.\/:;<=>?@[\]^_`{|}~-])/g;


function subscript(state, silent) {
  var found,
      content,
      max = state.posMax,
      start = state.pos;

  if (state.src.charCodeAt(start) !== 0x7E/* ~ */) { return false; }
  if (silent) { return false; } // don't run any pairs in validation mode
  if (start + 2 >= max) { return false; }

  state.pos = start + 1;

  while (state.pos < max) {
    if (state.src.charCodeAt(state.pos) === 0x7E/* ~ */) {
      found = true;
      break;
    }

    state.md.inline.skipToken(state);
  }

  if (!found || start + 1 === state.pos) {
    state.pos = start;
    return false;
  }

  content = state.src.slice(start + 1, state.pos);

  // don't allow unescaped spaces/newlines inside
  if (content.match(/(^|[^\\])(\\\\)*\s/)) {
    state.pos = start;
    return false;
  }

  // found!
  state.posMax = state.pos;
  state.pos = start + 1;

  // Earlier we checked !silent, but this implementation does not need it
  state.push({ type: 'sub_open', level: state.level++ });
  state.push({
    type: 'text',
    level: state.level,
    content: content.replace(UNESCAPE_RE, '$1')
  });
  state.push({ type: 'sub_close', level: --state.level });

  state.pos = state.posMax + 1;
  state.posMax = max;
  return true;
}


function sub_open()  { return '<sub>'; }
function sub_close() { return '</sub>'; }


module.exports = function sub_plugin(md) {
  md.inline.ruler.after('emphasis', 'sub', subscript);
  md.renderer.rules.sub_open = sub_open;
  md.renderer.rules.sub_close = sub_close;
};