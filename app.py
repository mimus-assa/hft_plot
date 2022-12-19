import os
import pandas as pd
from flask import Flask, render_template, request

app = Flask(__name__)

# get a list of the files in the 'datas' folder
files = os.listdir('datas')

# Retrieve the list of files in the datas folder
files = os.listdir('datas')

@app.route('/', methods=['GET'])
def index():
    """Render the index.html template with the list of files"""
    return render_template('index.html', files=files)

@app.route('/plot', methods=['POST'])
def plot():
    """Render the plot.html template with the data from the selected file"""
    filename = request.form['file']
    df = pd.read_csv('datas/' + filename)
    # Select only the columns of interest
    df = df[['datetime', 'delta']]
    return render_template('plot.html', df=df.to_dict(), files=files)

@app.route('/savetimestamps', methods=['POST'])
def save_timestamps():
    """Save the timestamps in a csv file"""
    timestamps = request.form['timestamps']
    filename = request.form['filename']
    # Convert the timestamps from json to a list
    timestamps = json.loads(timestamps)
    df = pd.DataFrame({"timestamps": timestamps})
    # Save the data in a csv
    df.to_csv(filename, index=False)
    return jsonify({"message": "saved"})

if __name__ == '__main__':
    # Run the application in debug mode
    app.run(debug=True)
