
 const Context = require('../semantic/context');
 const Program = require('../entities/program.js');
 const Body = require('../entities/body.js');
 const FuncDec = require('../entities/funcdec.js');
 const VarDec = require('../entities/vardec.js');
 const IfStmt = require('../entities/ifstmt.js');
 const WhileStmt = require('../entities/whilestmt.js');
 const ForStmt = require('../entities/forstmt.js');
 const BinExpAdd = require('../entities/binexpAdd.js'); // WIP
 const BinExpMul = require('../entities/binexpMul.js'); // WIP
 const BinExpOperator = require('../entities/binexpOperator.js'); // WIP
 const BinExpRel = require('../entities/binexpRel.js'); // WIP
 // const UnExpCall = require('../entities/unexpCall.js');
 const UnExpLit = require('../entities/unexpLit.js');
 const UnExpId = require('../entities/unexpId.js');
 // const Params = require('../entities/params.js');
 // const Param = require('../entities/param.js');
 const IntLit = require('../entities/intLit.js');
 // const BoolLit = require('../entities/boolLit.js');
 // const StringLit = require('../entities/stringLit.js');
 const FuncCall = require('../entities/callexp.js');

 const indentPadding = 2;
 let indentLevel = 0;

 function genStatementList(statements) {
   indentLevel += 1;
   statements.forEach(statement => statement.gen());
   indentLevel -= 1;
 }

 function emit(line) {
   console.log(`${' '.repeat(indentPadding * indentLevel)}${line}`);            //eslint-disable-line
 }

 function makeOp(op) {
   return { '~': '!', and: '&&', or: '||', '==': '===', '!=': '!==', '!': ';' }[op] || op;
 }

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
     `(${this.block.gen()})`;
   },
 });

 Object.assign(Body.prototype, {
   gen() {
     this.statements.forEach(s => s.gen());
   },
 });

 Object.assign(FuncDec.prototype, {
   gen() {
     emit(`function ${jsName(this.id)}(${this.params.map(p => p.gen()).join(', ')}) {`);
     genStatementList(this.body);
     emit('}');
   },
 });

 Object.assign(VarDec.prototype, {
   gen() {
     emit(`let ${(this.id)} = ${this.expStmt.gen()};`);
     //return jsName(this.id);
   },
 });

 Object.assign(IfStmt.prototype, {
   gen() {
     console.log('TODO');
   },
 });

 Object.assign(WhileStmt.prototype, {
   gen() {
     emit(`while (${this.expStmt.gen()}) {`);

     indentLevel += 1;
     this.body.gen();
     indentLevel -= 1;

     emit('}');
   },
 });

 Object.assign(ForStmt.prototype, {
   gen() {
     emit(`for (${this.decl.gen(true)}; ${this.condition.gen()}; ${this.incDec.gen(true)}) {`);

     indentLevel += 1;
     this.body.gen();
     indentLevel -= 1;

     emit('}');
   },
 });

 Object.assign(BinExpAdd.prototype, {
   gen() {
     emit(`${this.firstExp.gen()} ${this.binop} ${this.secExp.gen()};`);
   },
 });

 Object.assign(BinExpMul.prototype, {
   gen() {
     emit(`${this.firstExp.gen()} ${this.binop} ${this.secExp.gen()};`);
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

 // Object.assign(UnExpCall.prototype, {
 //   gen() {
 //     console.log('TODO');
 //   },
 // });
 //
 Object.assign(UnExpLit.prototype, {
    gen() {
      return this.literal.gen();
    },
 });
 //
 Object.assign(UnExpId.prototype, {
    gen() {
        if (this.secondOpLength === 0 && this.firstOpLength !== 0) {
          return `${this.firstOp.toString()}, ${this.id.toString()}`;
      } else if (this.firstOpLength === 0 && this.secondOpLength !== 0) {
          return `${this.id.toString()}, ${this.secondOp.toString()}`;
        }
        return `${this.id.toString()}`;
    },
 });
 //
 // Object.assign(Params.prototype, {
 //   gen() {
 //     console.log('TODO');
 //   },
 // });
 //
 // Object.assign(Param.prototype, {
 //   gen() {
 //     console.log('TODO');
 //   },
 // });
 //
 Object.assign(IntLit.prototype, {
    gen() {
      return parseInt(this.theInt, 10);
    },
 });
 //
 // Object.assign(BoolLit.prototype, {
 //   gen() {
 //     console.log('TODO');
 //   },
 // });
 //
 // Object.assign(StringLit.prototype, {
 //   gen() {
 //     console.log('TODO');
 //   },
 // });

 Object.assign(FuncCall.prototype, {
   gen() {
     emit(`${this.id}_(${this.args.gen()})`);
   },
 });
