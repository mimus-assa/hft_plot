import os
import json
import pandas as pd
from flask import Flask, render_template, request, jsonify
app = Flask(__name__)
files = os.listdir('datas')

@app.route('/', methods=['GET'])
def index():
    return render_template('index.html', files=files)

@app.route('/hft_plot', methods=['POST','GET'])
def hft_plot():
    filename = request.form['file']
    df = pd.read_csv('datas/' + filename)
    # Select only the columns of interest
    df = df[['datetime', 'delta']]
    return render_template('hft_plot.html', df=df.to_dict(), files=files, filename=filename)

@app.route('/btc_trades_analysis', methods=['POST','GET'])
def btc_trades_analysis():
    filename = request.form['file']
    df = pd.read_csv('datas/' + filename)
    # Select only the columns of interest
    df = df[['datetime', 'open', 'high', 'low', 'close']]
    return render_template('btc_trades_analysis.html', df=df.to_dict(), files=files, filename=filename)


@app.route('/savetimestamps', methods=['POST'])
def save_timestamps():
    timestamps = request.form['timestamps']
    filename = request.form['filename']
    # Convert the timestamps from json to a list
    timestamps = json.loads(timestamps)
    df = pd.DataFrame({"timestamps": timestamps})
    # Save the data in a csv
    df.to_csv(filename, index=False)
    return jsonify({"message": "saved"})

if __name__ == '__main__':
    app.run(debug=True)
