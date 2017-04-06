class FuncDec {
  constructor(id, params, body) {
    this.id = id;
    this.params = params;
    this.body = body;
  }
  toString() {
    return `(FuncDec ${this.id}, ${this.params}, ${this.body})`;
  }
}

module.exports = FuncDec;
