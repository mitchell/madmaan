class VarDec {
  constructor(id, expStmt) {
    this.id = id;
    this.expStmt = expStmt;
  }
  toString() {
    return `(VarDec ${this.id.toString()}, ${this.expStmt.toString()})`;
  }
}

module.exports = VarDec;
