from <%= appName %> import app

from flask import Flask, request, redirect, render_template, url_for

@app.route('/')
def index():
    return render_template('index.html')
