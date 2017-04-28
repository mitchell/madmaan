class IfStmt {
  constructor(ifCase, ifBody, elifCases, elseCase, elseBody) {
    this.ifCase = ifCase;
    this.ifBody = ifBody;
    this.elifCases = elifCases;
    this.elseCase = elseCase;
    this.elseBody = elseBody;
  }
  toString() {
    const result = this.elifCases.forEach(s => result.concat(s.toString()));

    if (this.elseCase.length > 0) {
      return `(IfStmt ${this.ifCase} ${this.ifBody} result Else ${this.elseCase} ${this.elseBody})`;
    } return `(IfStmt ${this.ifCase} ${this.ifBody})`;
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
