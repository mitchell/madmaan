const fs = require('fs');
const ohm = require('ohm-js');
const assert = require('assert');

function parse(string) {
  const grammar = ohm.grammar(fs.readFileSync('./madmaan.ohm'));
  return grammar.match(string);
}

describe('Madmaan Syntax', () => {
  it('"x is 12!" should be a valid variable declaration', () => {
    const match = parse('x is 12!');
    assert.ok(match.succeeded());
  });

  it('"9 + 10!" should be a valid Binary Expression', () => {
    const match = parse('9 + 10!');
    assert.ok(match.succeeded());
  });
});
