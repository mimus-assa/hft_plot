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
    Plotly.newPlot('plotly', [trace], layout);
}
