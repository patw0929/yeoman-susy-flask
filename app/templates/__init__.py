from flask import Flask, request, redirect
from flask.ext.mobility import Mobility

app = Flask(__name__)

Mobility(app)

# Load settings
app.config.from_object('<%= appName %>.default_settings')
# In staging environment, please make file 'application.cfg' link to 'dev.cfg' manually.
app.config.from_pyfile('application.cfg', silent = True)
app.config.from_pyfile('dev.cfg', silent = True)

import <%= appName %>.views
