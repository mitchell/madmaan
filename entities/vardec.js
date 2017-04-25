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
    // console.log(this.expStmt +"********");
    // console.log(context.lookup(this.expStmt));
    // console.log('Added to context');
    if (this.expStmt instanceof UnExpId) {
      this.expStmt = context.lookup(this.expStmt.id);
      console.log("yitties");
    }
    this.type = this.expStmt.analyze(context);
    context.addVariable(this.id, this.expStmt);
    // console.log(this.id + ' is: ' + this.type);
    // console.log(this.id + ' is: ' + this.expStmt);
  }
}

module.exports = VarDec;
