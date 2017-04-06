class IfStmt {
  constructor(expStmt, body) {
    this.expStmt = expStmt;
    this.body = body;
  }
  toString() {
    return `(IfStmt ${this.expStmt} ${this.body})`;
  }
}

module.exports = IfStmt;
