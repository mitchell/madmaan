const Type = require('./type');

class CallExp {
  constructor(id, params) {
    this.id = id;
    this.params = params;
  }

  toString() {
    return `(FuncCall ${this.id}, ${this.params})`;
  }
}

module.exports = CallExp;
