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
        const isNumber = this.firstExp.type.mustBeInt('expect int', 'line 40') || this.firstExp.type.mustBeFloat('expect float', 'line 40');
        const isNumberTwo = this.secExp.type.mustBeInt('expect int', 'line 40') || this.secExp.type.mustBeFloat('expect float', 'line 40');

        if (!isNumber || !isNumberTwo) {
          throw Error('Wrong operands, expected numbers');
        }

        const isFloat = this.firstExp.type.mustBeFloat('expect float', 'line 64');
        const isFloatTwo = this.secExp.type.mustBeFloat('expect float', 'line 64');

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
