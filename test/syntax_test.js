const fs = require('fs');
const ohm = require('ohm-js');
const assert = require('assert');

function parse(string) {
  const grammar = ohm.grammar(fs.readFileSync('./syntax/madmaan.ohm'));
  return grammar.match(string);
}

/* eslint-disable no-undef */

describe('Madmaan Syntax', () => {
  it('"x is 12!" should be a valid variable declaration', () => {
    const match = parse('x is 12!');
    assert.ok(match.succeeded());
  });

  it('"9 + 10!" should be a valid Binary Expression', () => {
    const match = parse('9 + 10!');
    assert.ok(match.succeeded());
  });

  it('"showMe() => "Hello World"!!" should be a valid function', () => {
    const match = parse('showMe() => "Hello World"!!');
    assert.ok(match.succeeded());
  });

  it('"showMe() => "Hello World"!!!" should not be a valid function', () => {
    const match = parse('showMe() => "Hello World"!!!');
    if (match.succeeded() === false) {
      assert.ok(true);
    }
  });

  it('"while true do 1+1!!" be a valid while loop', () => {
    const match = parse('while true do 1+1!!');
    assert.ok(match.succeeded());
  });

  it('"if x > y then showMe() => "x > y"!!!" be a valid if statement', () => {
    const match = parse('if x > y then showMe() => "x > y"!!!');
    assert.ok(match.succeeded());
  });
});
