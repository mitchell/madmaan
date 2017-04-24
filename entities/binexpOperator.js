const BinExp = require('./binexp.js');
const Type = require('./type');
const Context = require('../semantic/context.js');

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

  analyze(context) {
    this.firstExp.analyze(context);
    if (this.firstExp.name) {
      this.type = context.lookupVariable(this.firstExp.name).type;
    }
    if (this.secExp.length > 0) {
      for (let i = 0; i < this.secExp.length; i += 1) {
        this.secExp[i].analyze(context);
        if (['or', 'and'].includes(this.binop[0].operator)) {
          if (this.firstExp.type.literal !== 'bool' || this.secExp[i].type.literal !== 'bool') {
            throw Error('Wrong operands, not booleans');
          }
          this.type = Type.BOOLEAN;
        }
      }
    }

    if (!this.type) {
      this.type = this.firstExp.type;
    }
  }
}

module.exports = BinExpOperator;
