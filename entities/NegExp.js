const UnExp = require('./unexp.js');

class NegExp extends UnExp {
  constructor(Op, id) {
    super();
    this.Op = Op;
    this.id = id;
  }

  toString() {
    return `(${this.Op.toString()} ${this.id.toString()})`;
  }

  analyze(context) {
    //context.addVariable(this.id);
    /*if (context.lookup(this.id)) {
        context.addVariable(this.id);
    }*/
    console.log('bloop2');
    return context.lookup(this.id).type;
  }
}

module.exports = NegExp;
