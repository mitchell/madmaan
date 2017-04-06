class ForStmt {
  constructor(decl, condition, incDec, body) {
    this.decl = decl;
    this.condition = condition;
    this.incDec = incDec;
    this.body = body;
  }
  toString() {
    return `(for ${this.decl} ${this.condition} ${this.incDec} ${this.body})`;
  }
}

module.exports = ForStmt;
