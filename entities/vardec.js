class VarDec {
  constructor(id, expStmt) {
    this.id = id;
    this.expStmt = expStmt;
  }
  toString() {
    return `(VarDec ${this.id.toString()}, ${this.expStmt.toString()})`;
  }
  analyze(context) {
    context.addVariable(this.id);
    this.expStmt.analyze(context);
  }
}

module.exports = VarDec;
