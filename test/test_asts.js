const assert = require('assert');
// const util = require('util');
const parse = require('../syntax/parser.js');

/* eslint-disable no-undef */
/* eslint-disable no-console */
describe('madmaan ast', () => {
  it('x is 4!', () => {
    const ast = parse('x is 4!');
    const expected = '(Program (Body (VarDec x, (IntLit : 4))))';
    assert.equal(ast.toString(), expected);
  });

  it('10 * 10!', () => {
    const ast = parse('10 * 10!').toString();
    const expected = '(Program (Body ((IntLit : 10), *, (IntLit : 10))))';
    assert.equal(ast, expected);
  });

  it('showMe() => "Hello World!"!!', () => {
    const ast = parse('showMe() => "Hello World!"!!');
    const expected = '(Program (Body (FuncDec showMe, (Params ), (Body (StringLit : Hello World!)))))';
    assert.equal(ast.toString(), expected);
  });

  it('while x < 2 do x + 1!!', () => {
    const ast = parse('while x < 2 do x + 1!!').toString();
    const expected = '(Program (Body (While (RelOp : (x), <, (IntLit : 2)) (Body (Add : (x) + (IntLit : 1))))))';
    assert.equal(ast, expected);
  });

  it('for x is 10! x < 10! x++! 2 + 2!!', () => {
    const ast = parse('for x is 10! x < 10! x++! 2 + 2!!').toString();
    const expected = '(Program (Body (for (VarDec x, (IntLit : 10)) (RelOp : (x), <, (IntLit : 10)) (x, ++,) (Body (Add : (IntLit : 2) + (IntLit : 2))))))';
    console.log(ast);
    assert.equal(ast, expected);
  });

  it('if true then x is "you are beautiful"!!', () => {
    const ast = parse('if true then x is "you are beautiful"!!').toString();
    const expected = '(Program (Body (IfStmt (BoolLit : true) (Body (VarDec x, (StringLit : you are beautiful))))))';
    assert.equal(ast, expected);
  });

  it('x(a, b, c)!', () => {
    const ast = parse('x(a, b, c)!').toString();
    const expected = '(Program (Body ((x, (Params a, b, c)))))';
    console.log(ast);
    assert.equal(ast, expected);
  });

  it('true or false or true and false or x < 1!', () => {
    const ast = parse('true or false or true and false or x < 1!').toString();
    const expected = '(Program (Body (((((BoolLit : true), or, (BoolLit : false)), or, (BoolLit : true)), and, (BoolLit : false)), or, (RelOp : (x), <, (IntLit : 1)))))';
    assert.equal(ast, expected);
  });

  it('x is "Prof. Toal is the best!"!', () => {
    const ast = parse('x is "Prof. Toal is the best!"!').toString();
    const expected = '(Program (Body (VarDec x, (StringLit : Prof. Toal is the best!))))';
    assert.equal(ast, expected);
  });
});
