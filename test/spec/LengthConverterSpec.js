describe("LengthConverter", function() {
  var lengthConverter;

  beforeEach(function() {
    lengthConverter = new LengthConverter();
  });

  it("isNumber returns true for valid inputs", function() {
    expect(lengthConverter.isNumber('5')).toBeTruthy();
    expect(lengthConverter.isNumber('-1.5')).toBeTruthy();
    expect(lengthConverter.isNumber('0')).toBeTruthy();
    expect(lengthConverter.isNumber('0.42')).toBeTruthy();
    expect(lengthConverter.isNumber('.42')).toBeTruthy();
    expect(lengthConverter.isNumber('8e5')).toBeTruthy();
    expect(lengthConverter.isNumber('0x89f')).toBeTruthy();
  });

  it("isNumber returns false for invalid inputs", function() {
    expect(lengthConverter.isNumber('x89f')).not.toBe(true);
    expect(lengthConverter.isNumber('9,999')).toBeFalsy();
    expect(lengthConverter.isNumber('#abcdef')).toBeFalsy();
    expect(lengthConverter.isNumber('1.2.3')).toBeFalsy();
    expect(lengthConverter.isNumber('')).toBeFalsy();
    expect(lengthConverter.isNumber('blah')).toBeFalsy();
    expect(lengthConverter.isNumber('$1')).toBeFalsy();
  });

  it("convert calculates correct values for positive number input", function() {
    var distance = lengthConverter.convert(200, "Centimeter");
    expect(distance['Kilometer']).toEqual(0.002);
    expect(distance['Meter']).toEqual(2);
    expect(distance['Centimeter']).toEqual(200);
    expect(distance['Millimeter']).toEqual(2000);
    expect(distance['Mile']).toEqual(0.001242742);
    expect(distance['Yard']).toEqual(2.1872199999999995);
    expect(distance['Foot']).toEqual(6.56168);
    expect(distance['Inch']).toEqual(78.7402);
    expect(distance['Nautical mile']).toEqual(0.001079914);
  });

  it("convert calculates correct values for negative number input", function() {
    var distance = lengthConverter.convert(-5, "Mile");
    expect(distance['Kilometer']).toBe(-8.046722489462816);
    expect(distance['Meter']).toBe(-8046.722489462817);
    expect(distance['Centimeter']).toBe(-804672.2489462817);
    expect(distance['Millimeter']).toBe(-8046722.489462817);
    expect(distance['Mile']).toBe(-5);
    expect(distance['Yard']).toBe(-8799.97618170143);
    expect(distance['Foot']).toBe(-26400.00901232919);
    expect(distance['Inch']).toBe(-316800.2690824);
    expect(distance['Nautical mile']).toBe(-4.344884135242875);
  });

  it("convert returns zero values for zero number", function() {
    var distance = lengthConverter.convert(0, "Foot");
    expect(distance['Kilometer']).toBe(0);
    expect(distance['Meter']).toBe(0);
    expect(distance['Centimeter']).toBe(0);
    expect(distance['Millimeter']).toBe(0);
    expect(distance['Mile']).toBe(0);
    expect(distance['Yard']).toBe(0);
    expect(distance['Foot']).toBe(0);
    expect(distance['Inch']).toBe(0);
    expect(distance['Nautical mile']).toBe(0);
  });

  it("convert returns no values for invalid number", function() {
    var distance = lengthConverter.convert('gar#%^@bage', "Foot");
    expect(distance['Kilometer']).not.toBeDefined();
    expect(distance['Meter']).not.toBeDefined();
    expect(distance['Centimeter']).not.toBeDefined();
    expect(distance['Millimeter']).not.toBeDefined();
    expect(distance['Mile']).not.toBeDefined();
    expect(distance['Yard']).not.toBeDefined();
    expect(distance['Foot']).not.toBeDefined();
    expect(distance['Inch']).not.toBeDefined();
    expect(distance['Nautical mile']).not.toBeDefined();
  });

  it("convert returns no values for invalid unit", function() {
    var distance = lengthConverter.convert('5', "Blah");
    expect(distance['Kilometer']).not.toBeDefined();
    expect(distance['Meter']).not.toBeDefined();
    expect(distance['Centimeter']).not.toBeDefined();
    expect(distance['Millimeter']).not.toBeDefined();
    expect(distance['Mile']).not.toBeDefined();
    expect(distance['Yard']).not.toBeDefined();
    expect(distance['Foot']).not.toBeDefined();
    expect(distance['Inch']).not.toBeDefined();
    expect(distance['Nautical mile']).not.toBeDefined();
  });

});