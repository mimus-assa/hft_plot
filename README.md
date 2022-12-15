# hft_plot


This repository contains three files: `app.py`, `index.html`, and `plot.html`. The `app.py` file is the main file that serves as the main entry point for the application. It contains code to create a Flask application instance, list the files in the `datas` folder, and define routes to handle requests. The `index.html` file is the template file for the application, it contains HTML and Jinja code to create a form to select a file and submit the form. The `plot.html` file is the template file for the application, it contains HTML and JavaScript code to create an interactive plot using Plotly.

To use this repository, first clone it to your local machine. Next, create a virtual environment and activate it. Then, install the necessary packages using `pip`. Finally, run the Flask application using the command line. The application will start a local server and open a browser window with the `index` page. The user can then select a file from the list of files in the `datas` folder, and submit the form. The data from the selected file will be loaded and rendered in an interactive plot using Plotly. The user can then drag the plot to view different sections of the data.

This repository is useful for quickly creating a Flask application to visualize data stored in CSV files. It provides a simple form to select a file and an interactive plot to visualize the data. It can be easily modified to add more features or to use different plotting libraries. It is an ideal starting point for creating data visualization applications.
