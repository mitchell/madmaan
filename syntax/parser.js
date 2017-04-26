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
const Param = require('../entities/param.js');
const IntLit = require('../entities/intLit.js');
const BoolLit = require('../entities/boolLit.js');
const StringLit = require('../entities/stringLit.js');
const FuncCall = require('../entities/callexp.js');
const NotExp = require('../entities/NotExp.js');
const NegExp = require('../entities/NegExp.js');


const ohm = require('ohm-js');
const fs = require('fs');

/*function unpack(a) {
  return a.length === 0 ? 0 : a[0];
}*/

/* eslint-disable no-unused-vars */

const grammar = ohm.grammar(fs.readFileSync('./syntax/madmaan.ohm'));

const semantics = grammar.createSemantics().addOperation('ast', {
  Program(body) { return new Program(body.ast()); },
  Body(statements, _) { return new Body(statements.ast()); },
  FuncDec(id, params, arr, body) { return new FuncDec(id.sourceString, params.ast(), body.ast()); },
  VarDec(id, is, expStmt) { return new VarDec(id.sourceString, expStmt.ast()); },
  IfStmt(_1, expStmt, _2, body, _3, expStmt2, _4, body2, _5, body3) {
    return new IfStmt(expStmt.ast(), body.ast(), expStmt2, body2.ast(), body3.ast());
  },
  WhileStmt(_1, expStmt, _3, body) { return new WhileStmt(expStmt.ast(), body.ast()); },
  ForStmt(_1, vardec, _2, binexp2, _3, binexp3, _4, body) {
    return new ForStmt(vardec.ast(), binexp2.ast(), binexp3.ast(), body.ast());
  },
  BinExp3_addop(fExp, op, sExp) { return new BinExpAdd(fExp.ast(), op.sourceString, sExp.ast()); },
  BinExp4_mulop(fExp, op, sExp) { return new BinExpMul(fExp.ast(), op.sourceString, sExp.ast()); },
  BinExp_binop(fExp, op, sExp) {
    return new BinExpOperator(fExp.ast(), op.sourceString, sExp.ast());
  },
  BinExp2_relop(fExp, op, sExp) { return new BinExpRel(fExp.ast(), op.sourceString, sExp.ast()); },
  Params(op, param, comma, _rest, cp) { return new Params(param.ast(), _rest.ast()); },
  Param(id) { return new Param(id.sourceString); },
  UnExp_withOp(unaop, id, unaopEnd) {
    return new UnExpId(unaop.ast(), id.sourceString, unaopEnd.ast());
  },
  UnExp_calle(callexp) { return new UnExpCall(callexp.ast()); },
  UnExp_lit(lit) { return new UnExpLit(lit.ast()); },
  UnExp_negation(negOp, id) { return new NegExp(negOp.ast(), id.ast()); },
  intlit(n) { return new IntLit(this.sourceString); },
  strlit(fQuote, s, sQuote) { return new StringLit(s.ast()); },
  boollit(b) { return new BoolLit(this.sourceString); },
  CallExp(id, params) { return new FuncCall(id.sourceString, params.ast()); },
  _terminal() { return this.sourceString; },
});

const parse = (infile) => {
  const match = grammar.match(infile);
  if (match.succeeded()) {
    return semantics(match).ast();
  }
  return match.message;
};

module.exports = parse;
