const Type = require('./type.js');

class ElseIf {
  constructor(elifCase, elifBody) {
    this.elifCase = elifCase;
    this.elifBody = elifBody;
  }

  toString() {
    return `(elifCase: ${this.elifCase}, ${this.elifBody})`;
  }

  analyze(context) {
    const typeResult = this.elifCase.analyze(context);

    if (!typeResult.boolCheck()) {
      throw new Error('Expected boolean condition');
    }

    this.elifBody.analyze(context);
  }
}
module.exports = ElseIf;
