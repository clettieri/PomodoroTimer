from flask import render_template
from app import app

@app.route('/')
@app.route('/index')
def index():
    return render_template('index.html',title='Pomodoro Timer')

@app.route('/faq')
def about():
    return render_template('faq.html',title='Pomodoro Timer')

@app.route('/contact')
def contact():
    return render_template('contact.html',title='Pomodoro Timer')

@app.route('/login')
def login():
    return render_template('login.html',title='Pomodoro Timer')