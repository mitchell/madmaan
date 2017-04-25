const ExpStmt = require('./exp.js');
const Type = require('./type.js');

class IntLit extends ExpStmt {
  constructor(theInt) {
    super();
    this.theInt = theInt;
  }

  toString() {
    return `(IntLit : ${this.theInt.toString()})`;
  }

  analyze(context) {
    this.type = Type.INT;
    return this.type;
  }
}

module.exports = IntLit;
