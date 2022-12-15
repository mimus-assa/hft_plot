import os
import pandas as pd
from flask import Flask, render_template, request

app = Flask(__name__)

# get a list of the files in the 'datas' folder
files = os.listdir('datas')

# index route
@app.route('/', methods=['GET'])
def index():
    return render_template('index.html', files=files)

# plot route
@app.route('/plot', methods=['POST'])
def plot():
    # get the selected file name
    filename = request.form['file']
    # read the csv file
    df = pd.read_csv('datas/' + filename)
    # select the datetime and delta columns
    df = df[['datetime', 'delta']]
    return render_template('plot.html', df=df.to_dict(), files=files)

if __name__ == '__main__':
    app.run(debug=True)
