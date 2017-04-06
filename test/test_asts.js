const assert = require('assert');
const parse = require('../madmaan.js');

/* eslint-disable no-undef */
describe('madmaan ast', () => {
  it('x is 4!', () => {
    const ast = parse('x is 4!').toString();
    const expected = '(Program (Body (VarDec x, (IntLit : 4))))';
    assert.equal(ast, expected);
  });

  it('showMe() => "Hello World!"!!', () => {
    const ast = parse('showMe() => "Hello World!"!!').toString();
    const expected = '(Program (Body (FuncDec showMe, (Params ), (Body (StringLit : Hello World!)))))';
    assert.equal(ast, expected);
  });

  it('while x < 2 do x + 1!!', () => {
    const ast = parse('while x < 2 do x + 1!!').toString();
    const expected = '(Program (Body (While showMe, (Params ), (Body (StringLit : Hello World!)))))';
    assert.equal(ast, expected);
  });
});
