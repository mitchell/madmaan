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

class Body {
  contructor(statements) {
    this.statements = statements;
  }
  toString() {
    return `(Block ${this.statements})`;
  }
}

class Stmt {
  contructor(statements) {
    this.statements = statements;
  }
  toString() {
    return `(Block ${this.statements})`;
  }
}
class ExpStmt {}
class ForStmt {
  constructor(decl, condition, incDec, body) {
    this.decl = decl;
    this.condition = condition;
    this.incDec = incDec;
    this.body = body;
  }
  toString() {
    return `(For ${this.decl} ${this.condition} ${this.incDec} ${this.body})`;
  }
}
class IfStmt {}
class WhileStmt {
  constructor(expStmt, body) {
    this.expStmt = expStmt;
    this.body = body;
  }
  toString() {
    return `(While ${this.expStmt} ${this.body})`;
  }
}
class VarDec {
  constructor(id, expStmt) {
    this.id = id;
    this.expStmt = expStmt;
  }
  toString() {
    return `(Var ${this.id} ${this.expStmt})`;
  }
}
class FuncExp {}
class BinExp {}
class UnExp {}
class CallExp {}
class Literal {}

/* eslint-disable no-unused-vars, no-useless-escape */
const grammar = ohm.grammar(fs.readFile('./madmaan.ohm'));
