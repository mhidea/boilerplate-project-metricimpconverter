function ConvertHandler() {
  this.input = null
  this.getNum = function () {
    let noNum = new RegExp('^[a-z]+$', 'g')
    if (noNum.test(this.input)) {
      this.input = "1" + this.input
    }
    let doubleFraction = new RegExp('[0-9\.]+\/[0-9\.]+\/[0-9\.]+', 'g')
    if (doubleFraction.test(this.input)) {
      throw 'invalid number'
    }
    let p = new RegExp("^(\\d+(\\.\\d*)?(\/\\d*(\\.\\d*)?)?)+[a-z]*$", 'gi');
    return eval(p.exec(this.input)[1]);
  };

  this.getUnit = function () {
    let p = new RegExp('[a-z]+\$', 'gi')
    let m = p.exec(this.input)
    if (!m[0]) {
      throw 'invalid unit'
    }
    "".toLowerCase
    if (Object.keys(this.units).includes(m[0].toLowerCase()) ||
      Object.keys(this.units).includes(m[0].toUpperCase())) {
      return m[0];
    }
    throw 'invalid unit'
  };
  this.getReturnUnit = function () {
    return this.units[this.getUnit()].to;
  };

  this.spellOutUnit = function (unit) {
    return this.units[unit].name;
  };

  this.convert = function () {
    return (this.getNum() * this.units[this.getUnit()].convertion).toFixed(5);
  };


  this.getString = function () {
    return `${this.getNum()} ${this.units[this.getUnit()].name} converts to ${this.convert()} ${this.units[this.getReturnUnit()].name}.`;
  };


}

ConvertHandler.prototype.units = {
  gal: { to: "L", name: "gallons", convertion: 3.78541 },
  L: { to: "gal", name: "liters", convertion: 1 / 3.78541 },
  mi: { to: "km", name: "miles", convertion: 1.60934 },
  km: { to: "mi", name: "kilometers", convertion: 1 / 1.60934 },
  lbs: { to: "kg", name: "pounds", convertion: 0.453592 },
  kg: { to: "lbs", name: "kilograms", convertion: 1 / 0.45359 }
}
ConvertHandler.prototype.work = function (input) {
  this.input = input;
  try {
    let result = {
      initNum: this.getNum(),
      initUnit: this.getUnit(),
      returnNum: this.convert(),
      returnUnit: this.getReturnUnit(),
      string: this.getString()
    }
    return result
  } catch (error) {
    return error
  }
}

module.exports = ConvertHandler;

