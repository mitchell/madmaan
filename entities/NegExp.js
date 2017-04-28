const UnExp = require('./unexp.js');

class NegExp extends UnExp {
  constructor(firstOp, id) {
    super();
    this.firstOp = Op;
    this.id = id;
  }

  toString() {
    return `(${this.firstOp.toString()} ${this.id.toString()})`;
  }

  analyze(context) {
    //return context.lookup(this.id).type;
  }
}

module.exports = NegExp;
