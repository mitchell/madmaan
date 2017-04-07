class Body {
  constructor(statements) {
    this.statements = statements;
  }
  toString() {
    let s = '(Body';
    this.statements.forEach((x) => {
      s = `${s} ${x.toString()}`;
    });
    s = `${s})`;
    return s;
  }
  analyze(context) {
    this.statements.forEach(s => s.analyze(context));
  }
}

module.exports = Body;
