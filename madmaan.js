const ohm = require('ohm-js');
const fs = require('fs');
const argv = require('yargs').usage('$0 filename') // eslint-disable-line no-unused-vars
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
  constructor(statements) {
    this.statements = statements;
  }
  toString() {
    return `(Body ${this.statements.join(' ')})`;
  }
}
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
class IfStmt {
  constructor(expStmt, body) {
    this.expStmt = expStmt;
    this.body = body;
  }
  toString() {
    return `(IfStmt ${this.expStmt} ${this.body})`;
  }
}
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
    return `(VarDec ${this.id} ${this.expStmt})`;
  }
}
class FuncExp {
  constructor(params, body) {
    this.params = params;
    this.body = body;
  }
  toString() {
    return `(FuncExp ${this.params} ${this.body})`;
  }
}
class BinExp {
  constructor(left, op, right) {
    this.left = left;
    this.op = op;
    this.right = right;
  }
  toString() {
    return `(BinExp ${this.left} ${this.op} ${this.right})`;
  }
}
class UnExp {
  constructor(unary) {
    this.unary = unary;
  }
  toString() {
    return `(UnExp ${this.unary})`;
  }
}

class CallExp {
  constructor(id, parms) {
    this.id = id;
    this.parms = parms;
  }
  toString() {
    return `(CallExp ${this.id} ${this.parms})`;
  }
}

class Literal {
  constructor(value) {
    this.value = value;
  }
  toString() {
    return `(Literal ${this.value})`;
  }

}

class Params {
  constructor(ids) {
    this.ids = ids;
  }
  toString() {
    return `(Params ${this.ids.join(' ')})`;
  }
}
/* eslint-disable no-unused-vars */
const grammar = ohm.grammar(fs.readFileSync('./madmaan.ohm'));

const semantics = grammar.createSemantics().addOperation('ast', {
  Program(body) { return new Program(body.ast()); },
  Body(stmts, _) { return new Body(stmts.ast()); },
  ForStmt(f, vd, b, es, b2, es2, b3, body, b4) {
    return new ForStmt(vd.ast(), es.ast(), es2.ast(), body.ast());
  },
  IfStmt(f, es, th, body, bang) { return new IfStmt(es.ast(), body.ast()); },
  WhileStmt(wh, es, d, body, bang) { return new WhileStmt(es.ast(), body.ast()); },
  VarDec(id, is, es) { return new VarDec(id.sourceString, es.ast()); },
  FuncExp(parms, ar, body, bang) { return new FuncExp(parms.ast(), body.ast()); },
  BinExp_binop(left, op, right) { return new BinExp(left.ast(), op.sourceString, right.ast()); },
  BinExp2_relop(left, op, right) { return new BinExp(left.ast(), op.sourceString, right.ast()); },
  BinExp3_addop(left, op, right) { return new BinExp(left.ast(), op.sourceString, right.ast()); },
  BinExp4_mulop(left, op, right) { return new BinExp(left.ast(), op.sourceString, right.ast()); },
  UnExp_neg(op, right) { return new UnExp(op.sourceString, right.ast()); },
  CallExp(id, parms) { return new CallExp(id.sourceString, parms.ast()); },
  Params(parn, id, comm, ids, rparn) { return new Params(id.sourceString, ids.ast()); },
  intlit(_) { return new Literal(this.sourceString); },
  boollit(_) { return new Literal(this.sourceString); },
  strlit(q1, _, q2) { return new Literal(this.sourceString); },
});

const parse = (infile) => {
  const program = fs.readFileSync(infile);
  const match = grammar.match(program);
  if (match.succeeded()) {
    return semantics(match).ast().toString();
  }
  return match.message;
};

module.exports.parse = parse;

// console.log(parse(argv._[0])); // eslint-disable-line no-console
