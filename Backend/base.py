import os
from werkzeug.utils import secure_filename
from flask_cors import CORS, cross_origin
from flask_pymongo import PyMongo
import logging
from io import BytesIO
from flask import Flask, jsonify, request, session
from dataclasses import dataclass
from datetime import datetime
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.sql import text
import pickle
import tensorflow
import numpy as np
import pandas as pd
from numpy.linalg import norm
from tensorflow.keras.preprocessing import image
from tensorflow.keras.layers import GlobalMaxPooling2D
from tensorflow.keras.applications.resnet50 import ResNet50,preprocess_input
from sklearn.neighbors import NearestNeighbors
from PIL import Image
import cv2
import json
import twilio
# Download the helper library from https://www.twilio.com/docs/python/install
from twilio.rest import Client
import random # generate random number


logging.basicConfig(level=logging.INFO)
logger = logging.getLogger('HELLO WORLD')

ALLOWED_EXTENSIONS = set(['txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'])

api = Flask(__name__)
db_name = 'users.db'
api.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + db_name
api.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True
db = SQLAlchemy(api)

api.config['UPLOAD_FOLDER'] = './uploads'
cors = CORS(api)
CORS(api, expose_headers='Authorization')
megadata = pd.read_csv('./megadata.csv')

# ------------------PROFILE----------------------


@api.route('/profile')
def my_profile():
    response_body = {
        "name": "Name 1",
        "about" :"Hello! I am Developer"
    }
    return response_body


    # ------------------UPLOAD IMAGE----------------------


@api.route('/upload', methods=['POST'])
def fileUpload():
    target = os.path.join(api.config['UPLOAD_FOLDER'], 'test')
    if not os.path.isdir(target):
        os.mkdir(target)
    logger.info("welcome to upload`")
    file = request.files['files']
    filename = secure_filename(file.filename)
    destination = "/".join([target, filename])
    file.save(destination)
    session['uploadFilePath'] = destination
    response = "Whatever you wish too return"
    file1 = open("curruser.txt", "r")
    currentuser = file1.readline()
    file1.close()
    currenthistory = db.engine.execute('SELECT history FROM user WHERE username=:currentuser',{'currentuser':currentuser}).fetchone()
    currenthistory = str(currenthistory).replace('(', '')
    currenthistory = currenthistory.replace(')', '')
    currenthistory = currenthistory.replace(',', '')
    currenthistory = currenthistory.replace('\'', '')

    if(str(currenthistory) == 'None' ):
        currenthistory = ''

    currenthistory = str(currenthistory) + '|' + filename
    print(currenthistory,'----',currentuser)
    # currenthistory = None
    db.engine.execute('UPDATE user SET history =:history WHERE username =:username',{'history':currenthistory,'username':currentuser})
    db.session.commit()


    # ------------------FEATURE EXTRACTION----------------------

    feature_list = np.array(pickle.load(open('C:\\Users\\kshit\\Justpics\\NB\\embeddings.pkl', 'rb')))
    filenames = pickle.load(open('C:\\Users\\kshit\\Justpics\\NB\\filenames.pkl', 'rb'))

    model = ResNet50(weights='imagenet', include_top=False, input_shape=(224, 224, 3))
    model.trainable = False

    model = tensorflow.keras.Sequential([
        model,
        GlobalMaxPooling2D()
    ])
    imgpath = 'uploads/test/'+filename
    print(imgpath)
    img = image.load_img(imgpath, target_size=(224, 224))
    img_array = image.img_to_array(img)
    expanded_img_array = np.expand_dims(img_array, axis=0)
    preprocessed_img = preprocess_input(expanded_img_array)
    result = model.predict(preprocessed_img).flatten()
    normalized_result = result / norm(result)

    neighbors = NearestNeighbors(n_neighbors=6, algorithm='brute', metric='euclidean')
    neighbors.fit(feature_list)

    distances, indices = neighbors.kneighbors([normalized_result])
    # print(indices)
    recomandations=''
    results = []
    for file in indices[0][1:6]:
        tname = (filenames[file].split('\\'))[-1]
        recomandations= recomandations + tname + '|'
    recomandations= recomandations.split('|')
    print(recomandations)
    # for i in recomandations:
    #     tempp = megadata[megadata['filename']==i]
    #     tempo = tempp.filename
    #     tempo = tempo +'|'+tempp.Product_URL
    #     tempo = tempo+'|'+tempp.Image_URL
    #     tempo = tempo +'|'+tempp.Discount_Price
    #     # tempo = tempo +'|'tempp.Original_Price
    #
    #     print(tempo)
    #     results.append(tempo)
    print(type(recomandations))
    return recomandations

    # ------------------FORGOT PASSWORD----------------------

# @api.route('/forgot', methods=['POST'])
#
# def forgot():
#     mno = ''
#     otp = random.randint(1000,9999)
#     print("Your OTP is - ",otp)
#     # Your Account Sid and Auth Token from twilio.com/console
#     # DANGER! This is insecure. See http://twil.io/secure
#     account_sid = 'account_sid'
#     auth_token = 'token_id'
#     client = Client(account_sid, auth_token)
#
#     message = client.messages.create(
#              body='Hello Your Secure Device OTP is - ' + str(otp) ,
#              from_='+919913054473',
#              to= mno
#          )
#
#     print(message.sid)

    # ------------------HISTORY----------------------


@api.route('/history', methods=['POST'])

def gethistory():
    file1 = open("curruser.txt", "r")
    currentuser = file1.readline()
    file1.close()

    fullname = db.engine.execute('SELECT fullname FROM user WHERE username=:currentuser',
                                       {'currentuser': currentuser}).fetchone()

    hist = db.engine.execute('SELECT history FROM user WHERE username=:currentuser',
                                       {'currentuser': currentuser}).fetchone()

    hist = str(hist).replace('(', '')
    hist = hist.replace(')', '')
    hist = hist.replace(',', '')
    hist = hist.replace('\'', '')

    if (str(hist) == 'None'):
        return []
    hist = hist.split('|')
    hist.pop(0)
    print(fullname,'namnamenmanmnsfjsdfjsdkfjsdlkfjsdlkfjsdklfjsd----------------')
    fullname = str(fullname).replace('(', '')
    fullname = fullname.replace(')', '')
    fullname = fullname.replace(',', '')
    fullname = fullname.replace('\'', '')
    hist.insert(0,fullname)
    return (hist)

    # ------------------DATABASE----------------------


@dataclass
class User(db.Model):
  id: int
  email: str
  username:str
  password:str
  fullname:str

  id = db.Column(db.Integer, primary_key=True, auto_increment=True)
  email = db.Column(db.String(200), unique=True)
  username = db.Column(db.String(200),unique=True)
  password = db.Column(db.String(50))
  fullname = db.Column(db.String(50))


@api.route('/')
def users():
    try:
        users.db = User.query.all()
        return jsonify(users.db)
    except Exception as e:
        # e holds description of the error
        error_text = "<p>The error:<br>" + str(e) + "</p>"
        hed = '<h1>Something is broken.</h1>'
        return hed + error_text

    # ------------------ADD NEW USER----------------------


@api.route('/adduser', methods=['POST'])
def adduser():
    newuser = request.form
    print("data",newuser)
    email = newuser['email']
    username = newuser['username']
    password = newuser['password']
    fullname = newuser['fname']+" "+ newuser['lname']
    users.db = [User(email=email,username = username,password=password,fullname=fullname)]
    # db.create_all()
    db.session.add_all(users.db)
    db.session.commit()
    return "User added successfully"

    # ------------------LOGIN----------------------


@api.route('/login',methods=['GET','POST'])
def login():
    global currentuser
    userdata = request.form
    # print(userdata)
    username = userdata['username']
    password = request.form['password']
    usernamedata = db.engine.execute('SELECT username FROM user WHERE username=:username',{'username':username}).fetchone()
    passworddata = db.engine.execute('SELECT password FROM user WHERE username=:username',{'username':username}).fetchone()
    email = db.engine.execute('SELECT email FROM user WHERE username=:username',{'username':username}).fetchone()
    print(email)
    email = str(email).replace('(','')
    email = email.replace(')','')
    email = email.replace(',','')
    email = email.replace('\'','')


    if usernamedata is None:
        print('none')
        return {'user' : 'None'}
    else:
        for passd in passworddata:
            if passd == password:
                print('correct')
                resp = {"user":"correct","email":email}
                print(type(resp))
                file1 = open("curruser.txt", "w")  # write mode
                file1.write(username)
                file1.close()
                return (resp)
        print('incorrect')
        return {'user':'incorrect'}


#--------------------------------------------
if __name__ == "__main__":
    currentuser = ''
    api.secret_key = os.urandom(24)
    # users.db = User(email="user1@gmail.com",username='u1',password='pas1'), User(email="user2@gmail.com",username='u2',password='pas2')
    # db.create_all()
    # db.session.add_all(users.db)
    # db.session.commit()
    # db.engine.execute("ALTER TABLE user ADD COLUMN mnum INTEGER")
    api.run(debug=True)
