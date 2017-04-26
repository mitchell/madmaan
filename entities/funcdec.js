const Type = require('./type');
const Context = require('../semantic/context.js');

class FuncDec {
  constructor(id, params, body) {
    this.id = id;
    this.params = params;
    console.log(this.params);
    this.body = body;
  }

  toString() {
    return `(FuncDec ${this.id}, ${this.params}, ${this.body})`;
  }

  analyze(context) {
    const localContext = context.createChildContextForFunctionBody(this);

    // Each parameter will be declared in the function's scope, mixed in
    // with the function's local variables. This is by design.
    this.params.params.forEach(p => p.analyze(localContext));

    // Make sure all required parameters come before optional ones, and
    // gather the names up into sets for quick lookup.
    this.requiredParameterNames = new Set();
    this.allParameterNames = new Set();
    this.params.params.forEach((p) => {
      this.allParameterNames.add(p.id);
      if (p.isRequired) {
        this.requiredParameterNames.add(p.id);
        if (this.requiredParameterNames.size < this.allParameterNames.size) {
          throw new Error('Required parameter cannot appear after an optional parameter');
        }
      } // don't think I need this
    });

    // The function itself will be added to the outer scope, but only AFTER
    // the parameters have been inserted into the inner scope. This is because
    // we don't want to allow the function itself to be called in the default
    // expression of any parameter. Think about it. :)
    context.addVariable(this);

    // Now we analyze the body with the local context. Note that recursion is
    // allowed, because we've already inserted the function itself into the
    // outer scope, so recursive calls will be properly resolved during the
    // usual "outward moving" scope search. Of course, if you declare a local
    // variable with the same name as the function inside the function, you'll
    // shadow it, which would probably be not a good idea.
    if (this.body) {
      this.body.statements.forEach(s => s.analyze(localContext));
    }
  }
}

module.exports = FuncDec;
