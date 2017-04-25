
 const Context = require('../semantic/context');
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

 const indentPadding = 2;
 let indentLevel = 0;

 function genStatementList(statements) {
   indentLevel += 1;
   statements.forEach(statement => statement.gen());
   indentLevel -= 1;
 }

 function emit(line) {
   console.log(`${' '.repeat(indentPadding * indentLevel)}${line}`);
 }

 function makeOp(op) {
   return { '~': '!', and: '&&', or: '||', '==': '===', '!=': '!==' }[op] || op;
 }

 const jsName = (() => {
   let lastId = 0;
   const map = new Map();
   return (v) => {
     if (!(map.has(v))) {
       map.set(v, ++lastId); // eslint-disable-line no-plusplus
     }
     return `${v.id}_${map.get(v)}`;
   };
 })();

 function bracketIfNecessary(a) {
   if (a.length === 1) {
     return `${a}`;
   }
   return `[${a.join(', ')}]`;
 }

 function generateLibraryFunctions() {
   function generateLibraryStub(name, params, body) {
     const entity = Context.INITIAL.declarations[name];
     emit(`function ${jsName(entity)}(${params}) {${body}}`);
   }
  // This is sloppy. There should be a better way to do this.
   generateLibraryStub('showMe', '_', 'console.log(_);');
 }

 Object.assign(Program.prototype, {
   gen() {
     return `(${this.block})`;
   },
 });

 Object.assign(Body.prototype, {
   gen() {
     return `(${this.statements})`;
   },
 });

 Object.assign(FuncDec.prototype, {
   gen() {
     return `(${this.id}, ${this.params}, ${this.body})`;
   },
 });

 Object.assign(VarDec.prototype, {
   gen() {
     return `(${this.id}, ${this.expStmt})`;
   },
 });
// Object.assign(AssignmentStatement.prototype, {
//   gen() {
//     const targets = this.targets.map(t => t.gen());
//     const sources = this.sources.map(s => s.gen());
//     emit(`${bracketIfNecessary(targets)} = ${bracketIfNecessary(sources)};`);
//   },
// });
//
 Object.assign(BinExpAdd.prototype, {
   gen() {
     return `(${this.firstExp} ${this.binop} ${this.secExp})`;
   },
 });

 Object.assign(BinExpMul.prototype, {
   gen() {
     return `(${this.firstExp}, ${this.binop}, ${this.secExp})`;
   },
 });

 Object.assign(BinExpOperator.prototype, {
   gen() {
     return `(${this.firstExp}, ${this.binop}, ${this.secExp})`;
   },
 });

 Object.assign(BinExpRel.prototype, {
   gen() {
     return `(${this.firstExp}, ${this.relop}, ${this.secExp})`;
   },
 });
//
// Object.assign(BooleanLiteral.prototype, {
//   gen() { return `${this.value}`; },
// });
//
// Object.assign(BreakStatement.prototype, {
//   gen() { return 'break;'; },
// });
//
// Object.assign(CallStatement.prototype, {
//   gen() { emit(`${this.call.gen()};`); },
// });
//
// Object.assign(Call.prototype, {
//   gen() {
//     const fun = this.callee.referent;
//     const params = {};
//     const args = Array(this.args.length).fill(undefined);
//     fun.params.forEach((p, i) => { params[p.id] = i; });
//     this.args.forEach((a, i) => { args[a.isPositionalArgument ? i : params[a.id]] = a; });
//     return `${jsName(fun)}(${args.map(a => (a ? a.gen() : 'undefined')).join(', ')})`;
//   },
// });
//
// Object.assign(FunctionDeclaration.prototype, {
//   gen() { return this.function.gen(); },
// });
//
// Object.assign(FunctionObject.prototype, {
//   gen() {
//     emit(`function ${jsName(this)}(${this.params.map(p => p.gen()).join(', ')}) {`);
//     genStatementList(this.body);
//     emit('}');
//   },
// });
//
// Object.assign(IdentifierExpression.prototype, {
//   gen() { return this.referent.gen(); },
// });
//
// Object.assign(IfStatement.prototype, {
//   gen() {
//     this.cases.forEach((c, index) => {
//       const prefix = index === 0 ? 'if' : '} else if';
//       emit(`${prefix} (${c.test.gen()}) {`);
//       genStatementList(c.body);
//     });
//     if (this.alternate) {
//       emit('} else {');
//       genStatementList(this.alternate);
//     }
//     emit('}');
//   },
// });
//
// Object.assign(NumericLiteral.prototype, {
//   gen() { return `${this.value}`; },
// });
//
// Object.assign(Parameter.prototype, {
//   gen() {
//     let translation = jsName(this);
//     if (this.defaultExpression) {
//       translation += ` = ${this.defaultExpression.gen()}`;
//     }
//     return translation;
//   },
// });
//
// Object.assign(ReturnStatement.prototype, {
//   gen() {
//     if (this.returnValue) {
//       emit(`return ${this.returnValue.gen()};`);
//     } else {
//       emit('return;');
//     }
//   },
// });
//
// Object.assign(StringLiteral.prototype, {
//   gen() { return `${this.value}`; },
// });
//
// Object.assign(SubscriptedExpression.prototype, {
//   gen() {
//     const base = this.variable.gen();
//     const subscript = this.subscript.gen();
//     return `${base}[${subscript}]`;
//   },
// });
//
// Object.assign(UnaryExpression.prototype, {
//   gen() { return `(${makeOp(this.op)} ${this.operand.gen()})`; },
// });
//
// Object.assign(VariableDeclaration.prototype, {
//   gen() {
//     const variables = this.variables.map(v => v.gen());
//     const initializers = this.initializers.map(i => i.gen());
//     emit(`let ${bracketIfNecessary(variables)} = ${bracketIfNecessary(initializers)};`);
//   },
// });
//
// Object.assign(Variable.prototype, {
//   gen() { return jsName(this); },
// });
//
// Object.assign(WhileStatement.prototype, {
//   gen() {
//     emit(`while (${this.test.gen()}) {`);
//     genStatementList(this.body);
//     emit('}');
//   },
// });
