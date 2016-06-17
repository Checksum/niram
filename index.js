/*
 * niram - some simple color utility functions
 * Math from http://www.easyrgb.com/index.php?X=MATH
 */

function rgb2xyz(color) {
  var RGB = color.map(function(value) {
    value = value / 255;
    if (value > 0.04045) {
      value = Math.pow(((value + 0.055 ) / 1.055), 2.4);
    } else {
      value = value / 12.92;
    }

    return value * 100;
  });

  var X = RGB[0] * 0.4124 + RGB[1] * 0.3576 + RGB[2] * 0.1805;
  var Y = RGB[0] * 0.2126 + RGB[1] * 0.7152 + RGB[2] * 0.0722;
  var Z = RGB[0] * 0.0193 + RGB[1] * 0.1192 + RGB[2] * 0.9505;

  return [X, Y, Z];
}

function rgb2lab(color) {
  var XYZ = rgb2xyz(color);

  XYZ[0] = XYZ[0] / 95.047;        // ref_X =  95.047   Observer= 2°, Illuminant= D65
  XYZ[1] = XYZ[1] / 100.0;         // ref_Y = 100.000
  XYZ[2] = XYZ[2] / 108.883;       // ref_Z = 108.883

  XYZ = XYZ.map(function(value) {
    if (value > 0.008856) {
      value = Math.pow(value, 1 / 3);
    } else {
      value = (7.787 * value) + (16 / 116);
    }

    return value;
  });

  var L = (116 * XYZ[1]) - 16;
  var a = 500 * (XYZ[0] - XYZ[1]);
  var b = 200 * (XYZ[1] - XYZ[2]);

  return [L, a, b];
}

function deltaE_Lab(color1, color2) {
  return Math.sqrt(
    Math.pow((color1[0] - color2[0]), 2) +
    Math.pow((color1[1] - color2[1]), 2) +
    Math.pow((color1[2] - color2[2]), 2)
  );
}

function deltaE(color1, color2) {
  color1 = rgb2lab(color1);
  color2 = rgb2lab(color2);
  return deltaE_Lab(color1, color2);
}

exports.rgb2xyz = rgb2xyz;
exports.rgb2lab = rgb2lab;
exports.deltaE = deltaE;
exports.deltaE_Lab = deltaE_Lab;
