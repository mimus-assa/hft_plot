// This function is used to create the plotly plot from the data
function createPlot(data) {
  var trace = {
    x: Object.values(data.datetime),
    y: Object.values(data.delta),
    type: 'scatter',
    name: data.delta // include the delta value in the trace name
  };
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
  Plotly.newPlot('plotly', [trace], layout);
  document.getElementById('plotly').on('plotly_click', function(data){
    var x = data.points[0].x;
    var y = data.points[0].y;
    timestamps.push(x);
    var newTrace = {
      x: [x],
      y: [y],
      type: 'scatter',
      mode: 'markers',
      marker: {
        color: 'red'
      },
      name: y // include the y value (i.e., the delta value) in the trace name
    };
    Plotly.addTraces('plotly', newTrace);
  });
  document.getElementById('plotly').on('plotly_legenddoubleclick', function(data){
    Plotly.deleteTraces('plotly', [data.curveNumber]);
  });
}