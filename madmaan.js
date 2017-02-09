// An interpreter for Ael.
//
// Example usage:
//
//   $ node ael.js '8 + (7 / 2)'
//   11.5

const ohm = require('ohm-js');

const madmaanGrammar = ohm.grammar(`Iki {
  Program     =  Block
  Block       =  (Stmt "!")+
  Stmt        =  id                              -- decl
              |  VarExp "is" Exp                  -- assignment
              |  "show me" Exp                     -- print
              |  "while" Exp "  " Block          -- while
              |  "for" Exp "  " Block            -- for
              |  "if" Exp "then" Block ("elif" Exp "then" Block)* ("else" Block)*  -- if
  Exp         =  Exp "or" Exp1                   -- binary
              |  Exp1
  Exp1        =  Exp1 "and" Exp2                 -- binary
              |  Exp2
  Exp2        =  Exp3 relop Exp3                 -- binary
              |  Exp3
  Exp3        =  Exp3 addop Exp4                 -- binary
              |  Exp4
  Exp4        =  Exp4 mulop Exp5                 -- binary
              |  Exp5
  Exp5        =  prefixop Exp6                   -- unary
              |  Exp6
  Exp6        =  boollit
              |  intlit
              |  VarExp
              |  "(" Exp ")"                     -- parens
  VarExp      = id

  keyword     =  ("var" | "read" | "write" | "while" | "loop"
              |  "end" | "int" | "bool" | "true" | "false") ~idrest
  id          =  ~keyword letter idrest*
  idrest      =  "_" | alnum
  intlit      =  digit+
  boollit     =  "true" | "false"
  addop       =  "+" | "-"
  relop       =  "<=" | "<" | "==" | "!=" | ">=" | ">"
  mulop       =  "*" | "/" | "%"
  prefixop    =  ~"--" "-" | "not"

  space      +=  comment
  comment     =  "--" (~"\n" any)* "\n"
}`);

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
