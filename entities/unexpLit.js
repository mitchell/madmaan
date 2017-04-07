const UnExp = require('./unexp.js');

class UnExpLit extends UnExp {
  constructor(literal) {
    super();
    this.literal = literal;
  }

  toString() {
    return `${this.literal}`;
  }
}

module.exports = UnExpLit;
