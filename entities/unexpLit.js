const UnExp = require('./unexp.js');
const Type = require('./type.js');

class UnExpLit extends UnExp {
  constructor(literal) {
    super();
    this.literal = literal;
  }

  toString() {
    return `${this.literal}`;
  }

  analyze(context) {
    this.type = this.literal.analyze();
    return this.type;
  }
}

module.exports = UnExpLit;
