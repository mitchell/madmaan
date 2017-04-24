const Type = require('./type.js');

class StringLit {
  constructor(theString) {
    this.theString = theString;
  }

  toString() {
    const theStringJoined = this.theString.join('');
    return `(StringLit : ${theStringJoined})`;
  }

  analyze(context) {
    this.type = Type.STRING;
  }
}

module.exports = StringLit;
