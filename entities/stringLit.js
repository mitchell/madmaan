class StringLit {
  constructor(theString) {
    this.theString = theString;
  }

  toString() {
    return `(StringLit : ${this.theString})`;
  }
}

module.exports = StringLit;
