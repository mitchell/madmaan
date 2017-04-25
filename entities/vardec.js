const Type = require('./type.js');

class VarDec {
  constructor(id, expStmt) {
    this.id = id;
    this.expStmt = expStmt;
    //this.type;
  }
  toString() {
    return `(VarDec ${this.id.toString()}, ${this.expStmt.toString()})`;
  }
  analyze(context) {
    console.log('Added to context');
    this.type = this.expStmt.analyze(context);
    context.addVariable(this.id, this.expStmt);
    console.log('The type is: ' + this.type);
  }
}

module.exports = VarDec;
