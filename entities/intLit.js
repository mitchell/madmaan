const ExpStmt = require('./exp.js');

class IntLit extends ExpStmt {
  constructor(theInt) {
    super();
    this.theInt = theInt;
  }

  toString() {
    return `(IntLit : ${this.theInt.toString()})`;
  }
}

module.exports = IntLit;
