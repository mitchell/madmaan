// An interpreter for Ael.
//
// Example usage:
//
//   $ node ael.js '8 + (7 / 2)'
//   11.5

const ohm = require('ohm-js');

/* eslint-disable no-unused-vars, no-useless-escape */
const madmaanGrammar = ohm.grammar(`madmaan {
  Program   = Body
  Body      = (Stmt "!")+
  Stmt      = VarDec | IfStmt | WhileStmt | ExpStmt | ForStmt
  ExpStmt   = Exp
  ForStmt   = "for" VarDec "!" Exp "!" Exp "!" Body "!"
  IfStmt    = "if" Exp "then" Body ("elif" Exp "then" Body)* ("else" Body)* "!"
  WhileStmt = "while" Exp "do" Body "!"
  VarDec    = id "is" Exp
  Exp       = BinExp | FuncExp | UnExp | CallExp | Literal | id
  FuncExp   = "(" (id ("," id)*)* ")" "=>" Body "!"
  BinExp    = Exp binop Exp  -- binop
            | Exp relop Exp  -- relop
            | Exp mulop Exp  -- mulop
            | Exp addop Exp  -- addop
  UnExp     = unaop Exp  -- neg
            = id unaop   -- inc
  CallExp   = Exp
  Literal   = boollit | intlit | stringlit
  keywords  = ("if" | "else" | "elif" | "or" | "is"
               | "and" | "false" | "true" | "while" | "do")
  id        = ~keywords alnum+
  binop     = "or" | "and"
  mulop     = "*" | "/" | "%"
  addop     = "+" | "-"
  relop     = "==" | ">" | "<" | "<=" | ">=" | "~="
  unaop     = "-" | "~" | "++" | "--"
  boollit   = "false" | "true"
  intlit    = digit+
  stringlit = "\"" (~"\"" any)* "\""
}`);
/* eslint-enable no-unused-vars, no-useless-escape */

// This language is so simple, we don't need an AST.
/* const semantics = aelGrammar.createSemantics().addOperation('eval', {
  Exp_plus(e, _, t) { return e.eval() + t.eval(); },
  Exp_minus(e, _, t) { return e.eval() - t.eval(); },
  Term_times(t, _, f) { return t.eval() * f.eval(); },
  Term_divide(t, _, f) { return t.eval() / f.eval(); },
  Factor_negate(_, p) { return -p.eval(); },
  Primary_parens(open, e, close) { return e.eval(); }, // eslint-disable-line no-unused-vars
  number(chars) { return +this.sourceString; }, // eslint-disable-line no-unused-vars
});

const match = aelGrammar.match(process.argv[2]);
if (match.succeeded()) {
  console.log(semantics(match).eval()); // eslint-disable-line no-console
} else {
  console.error(match.message); // eslint-disable-line no-console
  process.exitCode = 1;
} */
