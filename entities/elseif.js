class ElseIf {
  constructor(elifCase, elifBody) {
    this.elifCase = elifCase;
    this.elifBody = elifBody;
  }

  toString() {
    return `(elifCase: ${this.elifCase}, ${this.elifBody})`;
  }
}
module.exports = ElseIf;
