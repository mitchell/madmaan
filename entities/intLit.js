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
    console.log('inside intlit analyze');
    this.type = Type.INT;
  }
}

module.exports = IntLit;
