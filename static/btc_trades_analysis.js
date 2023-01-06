function createPlot(df) {
    // Use the Plotly library to create a line plot
    var trace = {
        x: Object.values(df.datetime),
        y: Object.values(df.close),
        mode: 'lines',
        type: 'scatter'
    };
    var layout = {
        title: 'BTC Close Price'
    };
    Plotly.newPlot('plotly', [trace], layout, {displayModeBar: false});

    // Add a dot on the plot when the user clicks on it
    document.getElementById('plotly').on('plotly_click', function(data){
        var x = data.points[0].x;
        var y = data.points[0].y;
        // Use a random color for the dot
        var color = Math.random() > 0.5 ? 'red' : 'green';
        var update = {
            x: [[x]],
            y: [[y]],
            marker: {color: [color]},
            type: 'scatter'
        };
        Plotly.addTraces('plotly', update);
    });

    // Change the color of the dot when the user clicks on the legend
    document.getElementById('plotly').on('plotly_legendclick', function(data){
        var i = data.curveNumber;
        var update = {
            marker: {color: [(data.curve.marker.color === 'red' ? 'green' : 'red')]}
        };
        Plotly.restyle('plotly', update, [i]);
    });

    // Delete the dot when the user double clicks on the legend
    document.getElementById('plotly').on('plotly_legenddoubleclick', function(data){
        var i = data.curveNumber;
        Plotly.deleteTraces('plotly', [i]);
    });
}
