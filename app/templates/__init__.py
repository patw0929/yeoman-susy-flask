# -*- coding: utf-8 -*-

import os
import sys
reload(sys)
sys.setdefaultencoding('utf-8')

from flask import Flask, request, redirect
from flask.ext.mobility import Mobility

app = Flask(__name__)

# Load settings
app.config.from_object('<%= appName %>.default_settings')

# In staging environment,
# please make file 'application.cfg' link to 'dev.cfg' manually.
app.config.from_pyfile('application.cfg', silent=True)
app.config.from_pyfile('config/dev.cfg', silent=True)

Mobility(app)

import <%= appName %>.views
