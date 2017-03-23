const assert = require('assert');
const mad = require('../madmaan.js');

/* eslint-disable no-undef */
describe('madmaan ast', () => {
  it('should match test program \'x4 = 4!\'', () => {
    assert.equal(mad.parse('./test/testprog1.mad'), '(Program (Body (VarDec x4 (Literal 4))))');
  });
});
