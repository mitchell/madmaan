const UnExp = require('./unexp.js');

class UnExpCall extends UnExp {
  constructor(callExp) {
    super();
    this.callExp = callExp;
  }

  toString() {
    return `(${this.callExp})`;
  }
}

module.exports = UnExpCall;
