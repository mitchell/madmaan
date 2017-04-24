const Type = require('./type.js');

/* eslint-disable class-methods-use-this, no-unused-vars */
class FloatLit {
  constructor(value) {
    this.value = value;
  }

  analyze(context) {
    return Type.FLOAT;
  }

  toString() {
    return this.value;
  }
}

module.exports = FloatLit;
