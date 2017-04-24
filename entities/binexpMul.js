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
    this.firstExp.analyze(context);
    if (this.firstExp.name) {
      this.type = context.lookupVariable(this.firstExp.name).type;
    }
    if (this.secExp.length > 0) {
      for (let i = 0; i < this.secExp.length; i += 1) {
        this.secExp[i].analyze(context);
        if (['*', '/', '%'].includes(this.binOp[0].operator)) {
          if (!(Type.isNumber(this.firstExp.type.literal)) || !(Type.isNumber(this.secExp[i].type.literal))) {
            throw Error('Wrong operands, not numbers');
          }
          if (this.firstExp.type.literal === 'float' || this.secExp[i].type.literal === 'float') {
            this.type = Type.FLOAT;
          } else {
            this.type = Type.INT;
          }
        }
      }
    }
    if (!this.type) {
      this.type = this.firstExp.type;
    }
  }
}

module.exports = BinExpMul;
