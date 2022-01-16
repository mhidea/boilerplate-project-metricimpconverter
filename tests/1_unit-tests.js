const { expect } = require('chai');
const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');
expect(assert, 'k')
let convertHandler = new ConvertHandler();

suite('Unit Tests', function () {
    test('convertHandler should correctly read a whole number input.', function () {
        assert.isNumber(convertHandler.work('25mi').initNum, "Not a whole number input");
    })
    test('convertHandler should correctly read a decimal number input.', function () {
        assert.isNumber(convertHandler.work('25.356mi').initNum, "");
    })
    test('convertHandler should correctly read a fractional input.', function () {
        assert.isNumber(convertHandler.work('25/356mi').initNum, "");
    })
    test('convertHandler should correctly read a fractional input with a decimal.', function () {
        assert.isNumber(convertHandler.work('25.356/53.9mi').initNum, "");
    })
    test('convertHandler should correctly return an error on a double-fraction (i.e. 3/2/3).', function () {
        assert.ifError(convertHandler.work('25/5/5mi').initNum, "");
    })
    test("convertHandler should correctly default to a numerical input of 1 when no numerical input is provided.", function () {
        assert.equal(convertHandler.work('mi').initNum, 1, "");
    })
    test(
        "convertHandler should correctly read each valid input unit."
        , function () {
            Object.keys(convertHandler.units).forEach(val => {
                assert.equal(convertHandler.work('25' + val).initUnit, val, "");
            });
        })
    test("convertHandler should correctly return an error for an invalid input unit.", function () {
        assert.ifError(convertHandler.work('25m'), "");
    })





});