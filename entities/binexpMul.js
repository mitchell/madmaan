const BinExp = require('./binexp.js');

class BinExpMul extends BinExp {
  constructor(firstExp, mulop, secExp) {
    super();
    this.firstExp = firstExp;
    this.binop = mulop;
    this.secExp = secExp;
  }

  toString() {
    return `(${this.firstExp}, ${this.binop}, ${this.secExp})`;
  }
}

module.exports = BinExpMul;
