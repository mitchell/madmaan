const Type = require('./type.js');
const UnExpId = require('./unexpId.js');

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
    if (this.expStmt instanceof UnExpId) {
      this.expStmt = context.lookup(this.expStmt.id);
    }
    this.type = this.expStmt.analyze(context);
    context.addVariable(this.id, this.expStmt);
  }
}

module.exports = VarDec;
