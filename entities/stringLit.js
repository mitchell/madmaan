class StringLit {
  constructor(theString) {
    this.theString = theString;
  }

  toString() {
    const theStringJoined = this.theString.join('');
    return `(StringLit : ${theStringJoined})`;
  }
}

module.exports = StringLit;
