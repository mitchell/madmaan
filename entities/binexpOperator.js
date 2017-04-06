const BinExp = require('./binexp.js');

class BinExpOperator extends BinExp {
  constructor(firstExp, binop, secExp) {
    super();
    this.firstExp = firstExp;
    this.binop = binop;
    this.secExp = secExp;
  }

  toString() {
    return `(${this.firstExp}, ${this.binop}, ${this.secExp})`;
  }
}

module.exports = BinExpOperator;
