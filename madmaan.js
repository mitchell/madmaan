/* eslint-disable no-unused-vars, no-useless-escape */
const ohm = require('ohm-js');
const fs = require('fs');
const argv = require('yargs').usage('$0 filename')
  .argv;

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
    return `(Block ${this.statements.join(' ')})`;
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
class CallExp {
  constructor(id, parms) {
    this.id = id;
    this.parms = parms;
  }
  toString() {
    return `(CallExp ${this.id} ${this.parms})`;
  }
}
class Literal {}
class Params {
  constructor(ids) {
    this.ids = ids;
  }
  toString() {
    return `(Params ${this.ids.join(' ')})`;
  }
}
/* eslint-disable no-unused-vars, no-useless-escape */
const grammar = ohm.grammar(fs.readFile('./madmaan.ohm'));

const semantics = grammar.createSemantics().addOperation('ast', {
  Program(body) { return new Program(body.ast()); },
  Body(stmts, _) { return new Body(stmts.ast()); },
  Stmt(stmt) { return new Stmt(stmt.ast()); },
  ExpStmt(stmt) { return new ExpStmt(stmt.ast()); },
  ForStmt(vd, es, es2, body) { return new ForStmt(vd.ast(), es.ast(), es2.ast(), body.ast()); },
  IfStmt(es, body) { return new IfStmt(es.ast(), body.ast()); },
  WhileStmt(es, body) { return new WhileStmt(es.ast(), body.ast()); },
  VarDec(id, es) { return new VarDec(id.sourceString, es.ast()); },
  FuncExp(parms, body) { return new FuncExp(parms.ast(), body.ast()); },
  BinExp_binop(left, op, right) { return new BinExp(left.ast(), op.sourceString, right.ast()); },
  BinExp2_relop(left, op, right) { return new BinExp(left.ast(), op.sourceString, right.ast()); },
  BinExp3_addop(left, op, right) { return new BinExp(left.ast(), op.sourceString, right.ast()); },
  BinExp4_mulop(left, op, right) { return new BinExp(left.ast(), op.sourceString, right.ast()); },
  CallExp(id, parms) { return new CallExp(id.sourceString, parms.ast()); },
  Params(ids) { return new Params(ids.ast()); },
  Literal(lit) { return new Literal(lit); },
});
