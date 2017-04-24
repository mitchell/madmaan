/* eslint-disable class-methods-use-this, no-unused-vars */
class Param {
  constructor(id) {
    this.id = id;
  }

  analyze(context) {
    // Nothing to analyze. Intentionally left blank.
  }

  toString() {
    return `(${this.id})`;
  }
}

module.exports = Param;
