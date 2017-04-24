const error = require('../error');

/* eslint-disable no-unused-vars */

class Type {
  constructor(type) {
    this.type = type;
  }

  mustBeInt(message, location) {
    return this.mustBeCompatibleWith(Type.INT, message);
  }

  mustBeFloat(message, location) {
    return this.mustBeCompatibleWith(Type.FLOAT, message);
  }

  mustBeBool(message, location) {
    return this.mustBeCompatibleWith(Type.BOOL, message);
  }

  mustBeString(message, location) {
    return this.mustBeCompatibleWith(Type.STRING, message);
  }

  mustBeChar(message, location) {
    return this.mustBeCompatibleWith(Type.CHAR, message);
  }

  mustBeObject(message, location) {
    return this.mustBeCompatibleWith(Type.OBJECT, message);
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
    return (`(Type ${this.type})`);
  }
}

Type.isNumber = (literal) => {
  if (literal === 'int' || literal === 'float') {
    return true;
  }
  return false;
};

Type.INT = new Type('int');
Type.FLOAT = new Type('float');
Type.BOOL = new Type('boolean');
Type.STRING = new Type('string');
Type.CHAR = new Type('char');
Type.OBJECT = new Type('object');
Type.NULL = new Type('null');

module.exports = Type;
