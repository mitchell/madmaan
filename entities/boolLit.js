class BoolLit {
  constructor(theBool) {
    this.theBool = theBool;
  }

  toString() {
    return `(BoolLit : ${this.theBool.toString()})`;
  }
}

module.exports = BoolLit;
