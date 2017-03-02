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
