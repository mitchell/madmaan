const UnExp = require('./unexp.js');

class UnExpId extends UnExp {
  constructor(firstOp, id, secondOp) {
    super();
    this.firstOp = firstOp;
    this.id = id;
    this.secondOp = secondOp;
  }

  toString() {
    const firstOpLength = this.firstOp.toString().length;
    const secondOpLength = this.secondOp.toString().length;
    
    if (firstOpLength === 0 && secondOpLength === 0) {
        return `(${this.id.toString()})`;
    } else if (secondOpLength === 0 && firstOpLength != 0) {
        return `(${this.firstOp.toString()}, ${this.id.toString()})`;
    } else if (firstOpLength === 0 && secondOpLength != 0) {
        return `(${this.id.toString()}, ${this.secondOp.toString()},)`;
    }
  }
}

module.exports = UnExpId;
