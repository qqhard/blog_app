from app import app
from flask import render_template, session, make_response, request, jsonify

import pymongo
import json

client = pymongo.MongoClient(host='localhost', port=27017)


@app.route('/')
def home():
    print(session.get('session_id'))
    if session.get('session_id') is None:
        session['session_id'] = '1234567890'
    docs = []
    num = 0
    for o in client.blog.doc.find().limit(10):
        docs.append({'title': o['title'], 'url': o['url'], 'subtitle': o['text'].strip()[0:80]})

    # return render_template('index.html', docs=docs)

    resp = make_response(render_template('index.html', docs=docs))
    resp.set_cookie('session_id', 'the username')

    return resp


@app.route('/template')
def template():
    return render_template('home.html')


@app.route('/page/<page_num>', methods=['GET'])
def page(page_num):
    skip_num = int(page_num) * 10
    docs = []
    for o in client.blog.doc.find().limit(10).skip(skip_num):
        docs.append({'title': o['title'], 'url': o['url'], 'subtitle': o['text'].strip()[0:80]})
    return json.dumps(docs)

