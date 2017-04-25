const BinExp = require('./binexp.js');
const Type = require('./type');
const Context = require('../semantic/context.js');

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

  analyze(context) {
    this.firstExp.type = this.firstExp.analyze(context);

    if (this.secExp.toString().length > 0) { // gotta ensure that somethings there
      this.secExp.type = this.secExp.analyze(context);
      if (['*', '/', '%'].includes(this.binop)) {
        const isNumber = this.firstExp.type.intCheck() || this.firstExp.type.floatCheck();
        const isNumberTwo = this.secExp.type.intCheck() || this.secExp.type.floatCheck();

        if (!isNumber || !isNumberTwo) {
          throw Error('Wrong operands, expected numbers');
        }

        const isFloat = this.firstExp.type.floatCheck();
        const isFloatTwo = this.secExp.type.floatCheck();

        if (isFloat || isFloatTwo) {
          this.type = Type.FLOAT;
        } else {
          this.type = Type.INT;
        }
      }
    }
    return this.type;
  }
}

module.exports = BinExpMul;
