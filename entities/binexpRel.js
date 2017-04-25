const BinExp = require('./binexp.js');
const Type = require('./type');
const Context = require('../semantic/context.js');

class BinExpRel extends BinExp {
  constructor(firstExp, relop, secExp) {
    super();
    this.firstExp = firstExp;
    this.relop = relop;
    this.secExp = secExp;
  }

  toString() {
    return `(RelOp : ${this.firstExp}, ${this.relop}, ${this.secExp})`;
  }

  analyze(context) {
    this.firstExp.type = this.firstExp.analyze(context);

    if (this.secExp.toString().length > 0) { // gotta ensure that somethings there
        this.secExp.type = this.secExp.analyze(context);
        if (['==', '>', '<', '<=', '>=', '~='].includes(this.relop)) {

          const isNumber = this.firstExp.type.intCheck() || this.firstExp.type.floatCheck();
          const isNumberTwo = this.secExp.type.intCheck() || this.secExp.type.floatCheck();
            if (!isNumber || !isNumberTwo) {
                throw Error('Wrong operands, expected numbers');
            }
          this.type = Type.BOOL;
        }
    }

    return this.type;
  }
}

module.exports = BinExpRel;
