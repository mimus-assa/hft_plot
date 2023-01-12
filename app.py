import os
import json
import pandas as pd
from flask import Flask, render_template, request, jsonify
app = Flask(__name__)
files_1s = os.listdir('datas/1s/')
files_5m = os.listdir('datas/5m/')

@app.route('/', methods=['GET'])
def index():
    return render_template('index.html', files1=files_1s, files2=files_5m)

@app.route('/hft_plot', methods=['POST','GET'])
def hft_plot():
    filename = request.form['file']
    df = pd.read_csv('datas/1s/' + filename)
    # Select only the columns of interest
    df = df[['datetime', 'delta']]
    return render_template('hft_plot.html', df=df.to_dict(), files=files_1s, filename=filename)

@app.route('/btc_trades_analysis', methods=['POST','GET'])
def btc_trades_analysis():
    filename = request.form['file']
    df = pd.read_csv('datas/5m/' + filename)
    # Select only the columns of interest
    df = df[['datetime', 'open', 'high', 'low', 'close']]
    return render_template('btc_trades_analysis.html', df=df.to_dict(), files=files_5m, filename=filename)

@app.route('/savetimestamps', methods=['POST'])
def save_timestamps():
    data = request.form['timestamps']
    filename = request.form['filename']
    data = json.loads(data)
    # create an empty dictionary
    new_dict = {"x":[],"marker":[]}
    # loop through your_list
    for item in data:
        new_dict["x"].append(item["x"][0]) #x value is a list, take the first element
        new_dict["marker"].append(item["marker"]["color"])
    df = pd.DataFrame({"timestamps": new_dict["x"],"color": new_dict["marker"]})
    # Save the data in a csv
    df.to_csv(filename, index=False)
    return jsonify({"message": "saved"})

@app.route('/savetimestamps2', methods=['POST'])
def save_timestamps2():
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
