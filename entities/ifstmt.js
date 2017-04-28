const Type = require('./type.js');

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

    if (this.elifCases.length > 0) {
      if (this.elseCase.length > 0) {
        return `(IfStmt ${this.ifCase} ${this.ifBody} ${result} Else ${this.elseCase} ${this.elseBody})`;
      }
      return `(IfStmt ${this.ifCase} ${this.ifBody} ${result})`;
    }
    if (this.elseCase.length > 0) {
      return `(IfStmt ${this.ifCase} ${this.ifBody} Else ${this.elseCase} ${this.elseBody})`;
    } return `(IfStmt ${this.ifCase} ${this.ifBody})`;
  }
  analyze(context) {
    const expType = this.ifCase.analyze(context);
    if (!expType.boolCheck()) {
      throw new Error('Expected boolean condition');
    }

    this.ifBody.analyze(context);
    this.elifCases.forEach(s => s.analyze(context));
    if (this.elseCase.length > 0) {
      if (this.elseBody.length > 0) {
        this.elseBody.forEach(s => s.analyze(context));
      }
    }
  }
}

module.exports = IfStmt;
