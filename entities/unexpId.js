const UnExp = require('./unexp.js');

class UnExpId extends UnExp {
  constructor(negate, id) {
    super();
    this.negate = negate;
    this.id = id;
  }

  toString() {
    const val = this.negate.toString().length;
    if (val === 0) {
        return `(${this.id.toString()})`;
    } else {
        return `(${this.negate.toString()}, ${this.id.toString()})`;
    }
  }
}

module.exports = UnExpId;
