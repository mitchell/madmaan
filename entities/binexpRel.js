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
    console.log('Went into relOp');

    console.log('First exp type: ' + this.firstExp.type);
    this.firstExp.analyze(context);
    console.log('analyzed firstExp');
    if (this.firstExp.name) {
      this.type = context.lookupVariable(this.firstExp.name).type;
    }
    if (this.secExp.length > 0) {
      for (let i = 0; i < this.secExp.length; i += 1) {
        this.secExp[i].analyze(context);
        console.log('Relop: ' + this.relop[0].operator);
        if (['==', '>', '<', '<=', '>=', '~='].includes(this.relop[0].operator)) {
          if (!(Type.isNumber(this.firstExp.type.literal)) || !(Type.isNumber(this.secExp[i].type.literal))) {
            throw Error('Wrong operands, expected numbers');
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

module.exports = BinExpRel;
