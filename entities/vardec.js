const Type = require('./type.js');

class VarDec {
  constructor(id, expStmt) {
    this.id = id;
    this.expStmt = expStmt;
  }
  toString() {
    return `(VarDec ${this.id.toString()}, ${this.expStmt.toString()})`;
  }
  analyze(context) {
    console.log('Added to context');
    context.addVariable(this.id);
    this.type = this.expStmt.analyze(context);
    console.log('The type is: ' + this.type);
    console.log('Passed adding to contxt');

  }
}

module.exports = VarDec;
