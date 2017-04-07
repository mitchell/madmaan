const Context = require('../semantic/context.js');

class Program {
  constructor(block) {
    this.block = block;
  }
  toString() {
    return `(Program ${this.block.toString()})`;
  }
  analyze(context = Context.INITIAL) {
    this.block.analyze(context);
  }
}

module.exports = Program;
