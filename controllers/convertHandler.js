function ConvertHandler() {
  this.input = null
  this.getNum = function () {
    let p = new RegExp('^[^a-z]*(?=[a-z])', 'gi');
    let result = this.input.match(p);
    return result[0] ? eval(result[0]) : 1;
  };

  this.getUnit = function () {
    let p = new RegExp('[a-z]+\$', 'gi')
    return this.input.match(p)[0];
  };
  this.getReturnUnit = function () {
    return this.units[this.getUnit()].to;
  };

  this.spellOutUnit = function (unit) {
    let result;

    return result;
  };

  this.convert = function () {
    return (this.getNum() * this.units[this.getUnit()].convertion).toFixed(5);
  };


  this.getString = function () {
    return `${this.getNum()} ${this.units[this.getUnit()].name} converts to ${this.convert()} ${this.units[this.getReturnUnit()].name}`;
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
    return {
      initNum: this.getNum(),
      initUnit: this.getUnit(),
      returnNum: this.convert(),
      returnUnit: this.getReturnUnit(),
      string: this.getString()
    }
  } catch (error) {

  }
  return { string: "error" }
}

module.exports = ConvertHandler;

