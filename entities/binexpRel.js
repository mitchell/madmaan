const BinExp = require('./binexp.js');

class BinExpRel extends BinExp {
  constructor(firstExp, relop, secExp) {
    super();
    this.firstExp = firstExp;
    this.relop = relop;
    this.secExp = secExp;
  }

  toString() {
    return `(${this.firstExp}, ${this.relop}, ${this.secExp})`;
  }
}

module.exports = BinExpRel;
