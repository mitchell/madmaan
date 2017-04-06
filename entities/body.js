class Body {
  constructor(statements) {
    this.statements = statements;
  }
  toString() {
    let s = `(Body`;
    this.statements.forEach((x) => {
      s = `${s} ${x.toString()}`;
    });
    s = `${s})`;
    return s;
  }
}

module.exports = Body;
