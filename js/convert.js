$(document).ready(function() {
  var lengthConverter = new LengthConverter();
  generateInputButtons($('#toolbar'), lengthConverter.getLengthUnitsOfMeasurement());

  $('input[name="conversionRadio"]').change( function() {
    var selectedUnit = $(this).attr("id");
    updateAndDisplayConversions(selectedUnit);
  });

  $('#unit_input').on('keyup change', function() {
    var selectedUnit = $('#toolbar .active').children("input").attr("id");
    updateAndDisplayConversions(selectedUnit);
  });

  $('input[name="conversionRadio"]')[0].click();

  function updateAndDisplayConversions(baseUnit) {
    var newValue = $('#unit_input').val();
    var distanceConversion = lengthConverter.convert(newValue, baseUnit);
    $('.conversion-result').html(generateConversionHtml(distanceConversion));
    $('.form-group').removeClass('has-error');
    if(Object.keys(distanceConversion).length === 0) {
      $('.conversion-result').html("");
      $('.form-group').addClass('has-error');
    }
  }

  function generateConversionHtml(unitsHash) {
    var data = $('<div>', {'class': 'row'});
    for(var unit in unitsHash) {
      var unitHtml = $('<div>', {'class': 'col-lg-4'});
      unitHtml.append('<h2>' + parseFloat(unitsHash[unit].toFixed(6)) + '</h2>');
      unitHtml.append('<p>' + unit + '</p>');
      data.append(unitHtml);
    }
    return data;
  }

  function generateInputButtons(toolbar, lengthUnitsOfMeasurement) {
    var inputButtons = $('<div>');
    lengthUnitsOfMeasurement.forEach(function(unit) {
      var radioLabel = $('<label>', {'class': 'btn btn-default'});
      var radioButton = $('<input>', {'type': 'radio', 'name': 'conversionRadio', 'id': unit});
      radioLabel.append(radioButton);
      radioLabel.append(unit);
      toolbar.append(radioLabel);
    });
  }
});