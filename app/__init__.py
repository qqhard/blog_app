from flask import Flask
import os
app = Flask(__name__, static_url_path='')
app.config.from_pyfile("config.cfg")
app.config['SECRET_KEY'] = os.urandom(24)
print(app.config)
from app import views



if __name__ == '__main__':
    app.run()
