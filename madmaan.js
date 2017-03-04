const ohm = require('ohm-js');
const fs = require('fs');

class Program {
  constructor(block) {
    this.block = block;
  }
  toString() {
    return `(Program ${this.block})`;
  }
}
class Body {}
class Stmt {}
class ExpStmt {}
class ForStmt {}
class IfStmt {}
class WhileStmt {}
class VarDec {}
class FuncExp {}
class BinExp {}
class UnExp {}
class CallExp {}
class Literal {}

/* eslint-disable no-unused-vars, no-useless-escape */
const grammar = ohm.grammar(fs.readFile('./madmaan.ohm'));
