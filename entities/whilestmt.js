const Context = require('../semantic/context.js');

class WhileStmt {
  constructor(expStmt, body) {
    this.expStmt = expStmt;
    this.body = body;
  }
  toString() {
    return `(While ${this.expStmt} ${this.body})`;
  }
  analyze(context) {
    const bodyContext = context.createChildContextForBlock();
    const expType = this.expStmt.analyze(context);
    if (!expType.boolCheck()) {
      throw new Error('Expected boolean condition');
    }
    this.body.analyze(bodyContext);
  }
}

module.exports = WhileStmt;
