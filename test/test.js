var assert = require('chai').assert;
var niram = require('../');

function round(num) {
  return +num.toFixed(4);
}

// Target values from: http://colormine.org/color-converter
describe('Conversion', function() {
  describe('#rgb2lab', function() {
    it('should convert RGB to Lab', function() {
      assert.deepEqual(niram.rgb2lab([255, 255, 255]).map(round), [100, 0.0053, -0.01040]);
      assert.deepEqual(niram.rgb2lab([100, 100, 100]).map(round), [42.3746, 0.0026, -0.0052]);
      assert.deepEqual(niram.rgb2lab([0, 0, 0]).map(round), [0, 0, 0]);
    });
  });

  describe('#rgb2xyz', function() {
    it('should convert RGB to XYZ', function() {
      assert.deepEqual(niram.rgb2xyz([255, 0, 0]).map(round), [41.24, 21.26, 1.93]);
      assert.deepEqual(niram.rgb2xyz([255, 255, 0]).map(round), [77, 92.78, 13.85]);
      assert.deepEqual(niram.rgb2xyz([255, 255, 255]).map(round), [95.05, 100, 108.9]);
    });
  });
});
