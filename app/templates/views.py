from <%= appName %> import app

from flask import Flask, request, redirect, render_template, url_for
from flask.ext.mobility.decorators import mobile_template

@app.route('/')
@mobile_template('index{.mobile}.html')
def index(template):
    return render_template(template)
