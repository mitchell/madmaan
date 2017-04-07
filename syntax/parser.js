const Program = require('../entities/program.js');
const Body = require('../entities/body.js');
const FuncDec = require('../entities/funcdec.js');
const VarDec = require('../entities/vardec.js');
const IfStmt = require('../entities/ifstmt.js');
const WhileStmt = require('../entities/whilestmt.js');
const ForStmt = require('../entities/forstmt.js');
const BinExpAdd = require('../entities/binexpAdd.js');
const BinExpMul = require('../entities/binexpMul.js');
const BinExpOperator = require('../entities/binexpOperator.js');
const BinExpRel = require('../entities/binexpRel.js');
const UnExpCall = require('../entities/unexpCall.js');
const UnExpLit = require('../entities/unexpLit.js');
const UnExpId = require('../entities/unexpId.js');
const Params = require('../entities/params.js');
const IntLit = require('../entities/intLit.js');
const BoolLit = require('../entities/boolLit.js');
const StringLit = require('../entities/stringLit.js');

const ohm = require('ohm-js');
const fs = require('fs');

/* eslint-disable no-unused-vars */

const grammar = ohm.grammar(fs.readFileSync('./syntax/madmaan.ohm'));

const semantics = grammar.createSemantics().addOperation('ast', {
  Program: body => new Program(body.ast()),
  Body: (statements, _) => new Body(statements.ast()),
  FuncDec: (id, params, arr, body) => new FuncDec(id.sourceString, params.ast(), body.ast()),
  VarDec: (id, is, expStmt) => new VarDec(id.sourceString, expStmt.ast()),
  IfStmt: (_1, expStmt, _2, body) => new IfStmt(expStmt.ast(), body.ast()),
  WhileStmt: (_1, expStmt, _3, body) => new WhileStmt(expStmt.ast(), body.ast()),
  ForStmt: (_1, vardec, _2, binexp2, _3, binexp3, _4, body) =>
    new ForStmt(vardec.ast(), binexp2.ast(), binexp3.ast(), body.ast()),
  BinExp3_addop: (fExp, op, sExp) => new BinExpAdd(fExp.ast(), op.sourceString, sExp.ast()),
  BinExp4_mulop: (fExp, op, sExp) => new BinExpMul(fExp.ast(), op.sourceString, sExp.ast()),
  BinExp_binop: (fExp, op, sExp) => new BinExpOperator(fExp.ast(), op.sourceString, sExp.ast()),
  BinExp2_relop: (fExp, op, sExp) => new BinExpRel(fExp.ast(), op.sourceString, sExp.ast()),
  Params: (cp, id, comma, _rest, op) => new Params(id.sourceString, _rest.sourceString),
  UnExp_neg: (unaop, id) => new UnExpId(unaop.ast(), id.sourceString),
  intlit: n => new IntLit(n.sourceString),
  strlit: (fQuote, s, sQuote) => new StringLit(s.sourceString),
  boollit: b => new BoolLit(b.sourceString),
});

const parse = (infile) => {
  const match = grammar.match(infile);
  if (match.succeeded()) {
    return semantics(match).ast().toString();
  }
  return match.message;
};

module.exports = parse;