const UnExp = require('./unexp.js');

class UnExpId extends UnExp {
  constructor(negate, id) {
    super();
    this.negate = negate;
    this.id = id;
  }

  toString() {
    return `(${this.negate.toString()}, ${this.id.toString()})`;
  }
}

module.exports = UnExpId;
