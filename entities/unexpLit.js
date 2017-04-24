const UnExp = require('./unexp.js');

class UnExpLit extends UnExp {
  constructor(literal) {
    super();
    this.literal = literal;
  }

  toString() {
    return `${this.literal}`;
  }

  analyze() {
    console.log('inside unexpLit');
    this.type = this.literal.analyze();
    return this.type;
  }
}

module.exports = UnExpLit;
