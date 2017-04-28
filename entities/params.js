const Type = require('./type');
const Context = require('../semantic/context.js');

class Params {
  constructor(pOne, restParams) {
    this.params = pOne.concat((restParams.length > 0) ? restParams[0] : restParams);
  }

  toString() {
    if (this.params.length === 0) {
      return `(Parameters ${this.params})`;
    }
    return `(Parameters ${this.params.join(', ')})`;
  }
}

module.exports = Params;
