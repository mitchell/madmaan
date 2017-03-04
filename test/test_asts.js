const totest = require('../madmaan.js');
const assert = require('assert');

/* eslint-disable no-undef */
describe('madmaan ast', () => {
  it('should match test program \'x4 = 4!\'', () => {
    assert.equal(totest.parse('./testprog1.mad'), '(Program (Body (Stmt (VarDec (Var x4 (ExpStmt (BinExp (BinExp (BinExp (BinExp (UnExp (Literal 4))))))))))))');
  });
});
