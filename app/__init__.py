from flask import Flask
import os
app = Flask(__name__, static_url_path='')
app.config['SECRET_KEY'] = os.urandom(24)
from app import views


if __name__ == '__main__':
    app.run()
