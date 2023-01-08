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

  // Add the event listener for clicking on the plot
  document.getElementById('plotly').on('plotly_click', function(data) {
    // Get the coordinates of the click event
    var x = data.points[0].x;
    var y = data.points[0].y;

    // Add a dot at the click location
    Plotly.addTraces('plotly', {
      x: [x],
      y: [y],
      type: 'scatter',
      mode: 'markers'
    });
  });
}