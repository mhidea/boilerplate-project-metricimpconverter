const { expect } = require('chai');
const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');
expect(assert, 'k')
let convertHandler = new ConvertHandler();

suite('Unit Tests', function () {
    test('convertHandler should correctly read a whole number input', function () {
        assert.isNumber(convertHandler.work('25mi').initNum, "Not a whole number input");
    })
    test('convertHandler should correctly read a decimal number input', function () {
        assert.isNumber(convertHandler.work('25.356mi').initNum);
    })
    test('convertHandler should correctly read a fractional input', function () {
        assert.isNumber(convertHandler.work('25/356mi').initNum);
    })
    test('convertHandler should correctly read a fractional input with a decimal', function () {
        assert.isNumber(convertHandler.work('25.356/53.9mi').initNum);
    })
    test('convertHandler should correctly return an error on a double-fraction (i.e. 3/2/3)', function () {
        assert.ifError(convertHandler.work('25/5/5mi').initNum);
    })
    test("convertHandler should correctly default to a numerical input of 1 when no numerical input is provided", function () {
        assert.equal(convertHandler.work('mi').initNum, 1);
    })
    test(
        "convertHandler should correctly read each valid input unit"
        , function () {
            Object.keys(convertHandler.units).forEach(val => {
                assert.ok(convertHandler.work('25' + val).initUnit);
            });
        })
    test("convertHandler should correctly return an error for an invalid input unit", function () {
        assert.deepEqual(convertHandler.work('25m'), "invalid unit");
    })
    test("convertHandler should return the correct return unit for each valid input unit", function () {
        Object.keys(convertHandler.units).forEach(val => {
            assert.equal(convertHandler.work('25' + val).initUnit, val);
        });
    })
    test("convertHandler should correctly return the spelled-out string unit for each valid input unit", function () {
        Object.keys(convertHandler.units).forEach(key => {
            assert.equal(convertHandler.spellOutUnit(convertHandler.work('25' + key).initUnit), convertHandler.units[key].name, '');
        })
    })
    test("convertHandler should correctly convert gal to L", function () {
        assert.deepEqual(convertHandler.work('25gal').returnUnit, "L");
    })
    test("convertHandler should correctly convert L to gal", function () {
        assert.deepEqual(convertHandler.work('25L').returnUnit, "gal");
    })
    test("convertHandler should correctly convert mi to km", function () {
        assert.deepEqual(convertHandler.work('25mi').returnUnit, "km");
    })
    test("convertHandler should correctly convert km to mi", function () {
        assert.deepEqual(convertHandler.work('25km').returnUnit, "mi");
    })
    test("convertHandler should correctly convert lbs to kg", function () {
        assert.deepEqual(convertHandler.work('25lbs').returnUnit, "kg");
    })
    test("convertHandler should correctly convert kg to lbs", function () {
        assert.deepEqual(convertHandler.work('25kg').returnUnit, "lbs");
    })



});