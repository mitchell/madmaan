const BinExp = require('./binexp.js');
const Type = require('./type');
const Context = require('../semantic/context.js');

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

  analyze(context) {
    this.firstExp.analyze(context);
    if (this.firstExp.name) {
      this.type = context.lookupVariable(this.firstExp.name).type;
    }
    if (this.secExp.length > 0) {
      for (let i = 0; i < this.secExp.length; i += 1) {
        this.secExp[i].analyze(context);
        if (['+'].includes(this.binOp[0].operator)) {
          if (!(Type.isNumber(this.firstExp.type.literal)) || !(Type.isNumber(this.secExp[i].type.literal))) {
            throw Error('Numbers: Invalid operands expected numbers');
          }
          this.type = Type.INT;
        }
      }
    }
    if (!this.type) {
      this.type = this.firstExp.type;
    }
  }
}

module.exports = BinExpAdd;
