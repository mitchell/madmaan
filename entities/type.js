const error = require('../error');

/* eslint-disable no-unused-vars */

class Type {
  constructor(type) {
    this.type = type;
  }

  intCheck() {
    return this.type === 'int';
  }

  floatCheck() {
    return this.type === 'float';
  }

  numberCheck() {
    return this.type === 'float' || this.type === 'int';
  }

  boolCheck() {
    return this.type === 'bool';
  }

  stringCheck() {
    return this.type === 'string';
  }

  charCheck() {
    return this.type === 'char';
  }

  objectCheck() {
    return this.type === 'object';
  }

  mustBeCompatibleWith(otherType, message, location) {
    if (!this.isCompatibleWith(otherType)) {
      return error(message, location);
    }
    return true;
  }

  mustBeMutuallyCompatibleWith(otherType, message, location) {
    if (!(this.isCompatibleWith(otherType || otherType.isCompatibleWith(this)))) {
      return error(message, location);
    }
    return true;
  }

  isCompatibleWith(otherType) {
    return this === otherType || this === Type.ARBITRARY || otherType === Type.ARBITRARY;
  }

  toString() {
    return this.type;
  }
}

Type.INT = new Type('int');
Type.FLOAT = new Type('float');
Type.BOOL = new Type('bool');
Type.STRING = new Type('string');
Type.CHAR = new Type('char');
Type.OBJECT = new Type('object');
Type.NULL = new Type('null');

module.exports = Type;
