const Context = require('../semantic/context.js');

class ForStmt {
  constructor(decl, condition, incDec, body) {
    this.decl = decl;
    this.condition = condition;
    this.incDec = incDec;
    this.body = body;
  }

  toString() {
    return `(for ${this.decl} ${this.condition} ${this.incDec} ${this.body})`;
  }

  analyze(context) {
    const innerContext = context.createChildContextForLoop();
    this.decl.analyze(innerContext);

    const conditionType = this.condition.analyze(innerContext);

    if (!conditionType.boolCheck()) {
      throw new Error('Expected boolean condition');
    }

    const incDecType = this.incDec.analyze(innerContext);

    if (!incDecType.intCheck()) {
      throw new Error('Expected boolean condition');
    }
    this.body.analyze(innerContext);
  }
}

module.exports = ForStmt;
