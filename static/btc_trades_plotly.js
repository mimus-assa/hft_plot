
// This function is used to create the plotly plot from the data
function createPlot(data) {
  var openData = Object.values(data.open);
  var highData = Object.values(data.high);
  var lowData = Object.values(data.low);
  var closeData = Object.values(data.close);
  var datetimeData = Object.values(data.datetime);

  // Create the traces for the open, high, low, and close data
  var openTrace = {
    x: datetimeData,
    y: openData,
    type: 'scatter',
    name: 'Open',
    mode: 'lines'
  };
  var highTrace = {
    x: datetimeData,
    y: highData,
    type: 'scatter',
    name: 'High',
    mode: 'lines'
  };
  var lowTrace = {
    x: datetimeData,
    y: lowData,
    type: 'scatter',
    name: 'Low',
    mode: 'lines'
  };
  var closeTrace = {
    x: datetimeData,
    y: closeData,
    type: 'scatter',
    name: 'Close',
    mode: 'lines'
  };

  // Add a menu to choose between red and green colors
  var colorMenu = document.createElement('select');
  colorMenu.id = 'color-menu';

  var redOption = document.createElement('option');
  redOption.value = 'red';
  redOption.innerText = 'Red';
  colorMenu.appendChild(redOption);

  var greenOption = document.createElement('option');
  greenOption.value = 'green';
  greenOption.innerText = 'Green';
  colorMenu.appendChild(greenOption);

  document.body.appendChild(colorMenu);

  // Combine the traces into a single data array
  var data = [openTrace, highTrace, lowTrace, closeTrace];

  // Create the layout for the plot
  var layout = {
    xaxis: {
      range: [0, 500]
    },
    margin: {
      l: 40,
      r: 40,
      b: 40,
      t: 40
    },
    dragmode: 'pan'
  };

  // Create the plot
  Plotly.newPlot('plotly', data, layout);
  document.getElementById('plotly').on('plotly_click', function(data){
    var x = data.points[0].x;
    var y = data.points[0].y;
    timestamps.push(x);

    // Get the selected color from the menu
    var color = document.getElementById('color-menu').value;

    var newTrace = {
      x: [x],
      y: [y],
      type: 'scatter',
      mode: 'markers',
      marker: {
        color: color
      },
      name: y // include the y value (i.e., the delta value) in the trace name
    };
    Plotly.addTraces('plotly', newTrace);
  });
  document.getElementById('plotly').on('plotly_legenddoubleclick', function(data){
    Plotly.deleteTraces('plotly', [data.curveNumber]);
  });
}