class IfStmt {
  constructor(ifCase, ifBody, elifCases, elifBodys, elseCase) {
    this.ifCase = ifCase;
    this.ifBody = ifBody;
    this.elifCases = elifCases;
    this.elifBodys = elifBodys;
    this.elseCase = elseCase;
  }
  toString() {
    const result = `(IfStmt ${this.ifCase} ${this.body})`;
    this.elifCases.forEach(s => 'elif '.concat(s));
    this.elifBodys.forEach(s => 'then '.concat(s));
    console.log(this.elifCases);
    return `(IfStmt ${this.expStmt} ${this.body})`;
  }
  analyze(context) {
    const expType = this.expStmt.analyze(context);
    if (!expType.boolCheck()) {
      throw new Error('Expected boolean condition');
    }
    this.body.analyze(context);
  }
}

module.exports = IfStmt;
