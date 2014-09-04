from flask import Flask, request, redirect
from flask.ext.mobility import Mobility

app = Flask(__name__)

Mobility(app)

import <%= appName %>.views
