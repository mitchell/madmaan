class Params {
  constructor(pOne, restParams) {
    if (restParams.length === 0) {
      this.restParams = pOne;
    } else {
      this.restParams = pOne.length === 0 ? [] : pOne.concat(restParams[0]);
    }
  }

  toString() {
    let list = '(Params ';
    for (let i = 0; i < this.restParams.length - 1; i += 1) {
      list = `${list}${this.restParams[i].toString()}`;
    }
    list = `${list})`;
    return list;
  }
}

module.exports = Params;
