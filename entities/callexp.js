class CallExp {
  constructor(id, params) {
    this.id = id;
    this.params = params;
  }

  toString() {
    return `(${this.id}, ${this.params})`;
  }
}

module.exports = CallExp;
