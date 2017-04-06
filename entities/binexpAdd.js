const BinExp = require('./binexp.js');

class BinExpAdd extends BinExp {
  constructor(firstExp, addop, secExp) {
    super();
    this.firstExp = firstExp;
    this.binop = addop;
    this.secExp = secExp;
  }

  toString() {
    return `(Add : ${this.firstExp.toString()} ${this.binop.toString()} ${this.secExp.toString()})`;
  }
}

module.exports = BinExpAdd;
