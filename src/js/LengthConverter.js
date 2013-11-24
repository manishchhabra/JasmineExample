function LengthConverter() {
  LENGTH_CONVERSION_MAP = {
    'Kilometer': 1,
    'Meter': 1000,
    'Centimeter': 100000,
    'Millimeter': 1e+6,
    'Mile': 0.621371,
    'Yard': 1093.61,
    'Foot': 3280.84,
    'Inch': 39370.1,
    'Nautical mile': 0.539957
  };

  this.getUnitValue = function(unit) {
    return LENGTH_CONVERSION_MAP[unit];
  };

  this.getLengthUnitsOfMeasurement = function() {
    return Object.keys(LENGTH_CONVERSION_MAP);
  };
}

LengthConverter.prototype.isNumber = function(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

LengthConverter.prototype.convert = function(number, baseUnit) {
  var resultHash = {};
  if(this.getUnitValue(baseUnit) && this.isNumber(number)) {
    var unitsOfMeasurement = this.getLengthUnitsOfMeasurement();
    for(var i = 0; i < unitsOfMeasurement.length; i++) {
      var unit = unitsOfMeasurement[i];
      resultHash[unit] = (this.getUnitValue(unit) * number) / this.getUnitValue(baseUnit);
    }
  }
  return resultHash;
};