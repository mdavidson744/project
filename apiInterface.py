from asyncio.windows_events import NULL
from this import d
from flask import Flask, json, request, jsonify, make_response, session
from pymongo import MongoClient
from bson import ObjectId, uuid
import string
import os
from werkzeug.utils import secure_filename
import urllib.request
from flask_cors import CORS, cross_origin
import jwt
import datetime
from functools import wraps
import bcrypt

app = Flask(__name__)
CORS(app)

app.config['SECRET_KEY'] = 'mysecret'

# db link
client = MongoClient( "mongodb://127.0.0.1:27017")
db = client.projectV1
carListings = db.carListings
users = db.users
blacklist = db.blacklist

# ------ media upload -----
UPLOAD_FOLDER = 'src/assets/images' 
#if changing this, please also change the string name on addPhoto
#this has to be seperate due to the folder setup, where on call, it was looking for src/src instead of src/assets due to the front end being positioned elsewhere.

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024

ALLOWED_EXTENSIONS = set(['png', 'jpg', 'jpeg'])

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS
# ----- end media upload -----


def jwt_required(func):
    @wraps(func)
    def jwt_required_wrapper(*args, **kwargs):
        token = None
        if 'x-access-token' in request.headers:
            token = request.headers['x-access-token']
        if not token:
            return jsonify({ 'message': 'Token is missing'}), 401
        try:
            data = jwt.decode(token, app.config['SECRET_KEY'], algorithms=["HS256"])
        except:
            return jsonify({ 'message': 'Token is invalid'}), 401
        
        bl_token = blacklist.find_one({"token": token})
        if bl_token is not None:
            return make_response(jsonify({'message': 'Token has been cancelled'}), 401)
        return func(*args, **kwargs)
    return jwt_required_wrapper

#admin wrapped. not yet needed but may implement in the future
def admin_required(func):
    @wraps(func)
    def admin_required_wrapper(*args, **kwargs):
        token = request.headers['x-access-token']
        data = jwt.encode(token, app.config['SECRET_KEY'])
        if data["admin"]:
            return func(*args, **kwargs)
        else:
            return make_response( jsonify({'message': 'Admin access is required'}), 401)
        
    return admin_required_wrapper

@app.route("/")
def index():
    return make_response(jsonify({'message': 'Hello! This is the index page. If you require the car listings page, please go to /api/v1.0/carListings'}))

#add car listing
@app.route("/api/v1.0/carListings", methods=["POST"])
@jwt_required
def add_car_listing():
        new_car_listing = {
            "make": request.form["make"],
            "model": request.form["model"],
            "year": request.form["year"],
            "gearbox": request.form["gearbox"],
            "engineCapacity": request.form["engineCapacity"],
            "engineType": request.form["engineType"],
            "numberSeats": request.form["numberSeats"],
            "numberDoors": request.form["numberDoors"],
            "colour": request.form["colour"],
            "description": request.form["description"],
            "regNumber": request.form["regNumber"],
            "price": request.form["price"],
            "photos": [],
            # will gave MOT taking the registration data
            # "user": request.headers[""]
            "user": request.headers['username']
        }
        new_car_listing_id = carListings.insert_one(new_car_listing) # insertion
        new_car_listing_link = "http://localhost:5000/api/v1.0/carListings/" + str(new_car_listing_id.inserted_id)
        
        return make_response(jsonify({"url": new_car_listing_link, "id": str(new_car_listing_id.inserted_id)}))
   
    
#show all car listings
@app.route("/api/v1.0/carListings", methods=["GET"])
def show_all_car_listings():
    #pagination
    page_num, page_size = 1, 20
    if request.args.get("pn"):
        page_num = int(request.args.get('pn'))
    if request.args.get("ps"):
        page_size = int(request.args.get('ps'))
    page_start = (page_size * (page_num - 1))
    
    
    #initialising array
    data_to_return = []
    
    for car in carListings.find().skip(page_start).limit(page_size):
        car["_id"] = str(car["_id"])
        for photo in car["photos"]:
            photo["_id"] = str(photo["_id"])
        data_to_return.append(car)
            
    return make_response(jsonify(data_to_return), 200)

#show one car listing
@app.route("/api/v1.0/carListings/<string:id>", methods=["GET"])
def show_one_car_listing(id):
    if len(id) != 24 or not all(c in string.hexdigits for c in id): #checking if hexdigit as mongo used 24 character id's
        return make_response(jsonify({"error": "Invalid car ID or not of the correct format"}), 404) #catch
        
    car = carListings.find_one({'_id':ObjectId(id)})
    if car is not None:
        car['_id'] = str(car['_id'])
        for photo in car["photos"]:
            photo["_id"] = str(photo["_id"])
        return make_response(jsonify([car]), 200)
    else:
        return make_response(jsonify({"error": "Invalid car ID"}), 404) #catch

#update
@app.route("/api/v1.0/carListings/<string:id>", methods=["PUT"])
@jwt_required
def edit_car_listing(id):
    resultFind = carListings.find_one({"_id": ObjectId(id)})
    if resultFind['user'] != request.headers['username']:
        return make_response({'error': 'must be logged in as the same user that made the listing'}, 401)
    else:
        result = carListings.update_one( \
        { "_id": ObjectId(id)}, {
            "$set": {
                "make": request.form["make"],
                "model": request.form["model"],
                "year": request.form["year"],
                "gearbox": request.form["gearbox"],
                "engineCapacity": request.form["engineCapacity"],
                "engineType": request.form["engineType"],
                "numberSeats": request.form["numberSeats"],
                "numberDoors": request.form["numberDoors"],
                "colour": request.form["colour"],
                "description": request.form["description"],
                "regNumber": request.form["regNumber"],
                "price": request.form["price"],
                # will gave MOT taking the registration data
                "user": request.headers['username']
            }
        })
        if result.matched_count == 1: #if true
            edited_car_listing_link = "http://localhost:5000/api/v1.0/carListings/" + id

            return make_response(jsonify(
                { "url": edited_car_listing_link}), 200)
        else:
            return make_response(jsonify({"error": "Invalid car listing ID"}), 404) # catch  
            

#delete
@app.route("/api/v1.0/carListings/<string:id>", methods=["DELETE"])
@jwt_required
def delete_car_listing(id):
    resultFind = carListings.find_one({"_id": ObjectId(id)})
    if resultFind['user'] == request.headers['username'] or request.headers["username"] == 'admin':
        result = carListings.delete_one( { "_id" : ObjectId(id) } )
        if result.deleted_count == 1:
            return make_response(jsonify( {} ), 204)
        else:
            return make_response(jsonify( { "error": "Invalid car ID"} ), 404) # catch
    else:
        
        return make_response({'error': 'must be logged in as the same user that made the listing'}, 401)
        
    

#add photos
@cross_origin
@app.route("/api/v1.0/carListings/<string:id>/photos", methods=["POST"])
@jwt_required
def add_new_photo(id):
    
    resultFind = carListings.find_one({"_id": ObjectId(id)})
    if resultFind['user'] == request.headers['username'] or request.headers["username"] == 'admin':
        files = request.files.getlist('filesW')
        errors = {}
        success = False
        x = uuid.uuid1()
        
        for file in files:      
            if file:
                filename = str(x) + '.jpeg'
                filepath = 'assets/images/' + str(filename) # change starter string if you change folder upload location. refer to UPLOAD_FOLDER above
                file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
                success = True
            else:
                errors[file.filename] = 'File type is not allowed'
        
        new_photo = {
            "_id": ObjectId(),
            "filename": filename,
            "filepath": filepath
        }
        
        if success and errors:
            errors['message'] = 'File(s) successfully uploaded'
            resp = jsonify(errors)
            resp.status_code = 500
            return resp
        if success:
            resp = jsonify({'message' : 'Files successfully uploaded' + filename})
            resp.status_code = 201
            carListings.update_one( { "_id": ObjectId(id) }, {"$push": {"photos": new_photo } } )
            return resp
        else:
            resp = jsonify(errors)
            resp.status_code = 500
            return resp
    else:
        return make_response({'error': 'must be logged in as the same user that made the listing'})
#PHOTOS 
#get all
@app.route("/api/v1.0/carListings/<string:id>/photos", methods=["GET"])
def fetch_all_photos(id):
    
    if len(id) != 24 or not all(c in string.hexdigits for c in id): #checking if hexdigit as mongo used 24 character id's
       return make_response(jsonify({"error": "Invalid car listing ID"}), 404) #catch
    
    data_to_return = []
    car = carListings.find_one( \
        { "_id": ObjectId(id) },
        { "photos": 1, "_id" : 0 } )
    
    for photo in car["photos"]:
        photo["_id"] = str(photo["_id"])
        data_to_return.append(photo)
    return make_response(jsonify( data_to_return ), 200)
    

#delete photo
@app.route("/api/v1.0/carListings/<string:cid>/photos/<string:pid>", methods=["DELETE"])
@jwt_required
def delete_photo(cid, pid):
    
    resultFind = carListings.find_one({"_id": ObjectId(cid)})
    if resultFind['user'] != request.headers['username']:
        return make_response({'error': 'must be logged in as the same user that made the listing'}, 401)
        
    else:
        carListings.update_one(
            {"_id": ObjectId(cid)},
            {"$pull": {"photos":
                {"_id": ObjectId(pid)}}}
            )
        return make_response(jsonify({}), 204)
        
 
@app.route("/api/v1.0/login", methods=["GET"])
def login():
    auth = request.authorization
    if auth:
        user = users.find_one( { "username": auth.username})
        if user is not None:
            session['username'] = auth.username
            if bcrypt.checkpw( bytes( auth.password, 'UTF-8'), user["password"]):
                token = jwt.encode( {
                    'user': auth.username,
                    'admin': user["admin"],
                    'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=30)
                    }, app.config['SECRET_KEY'])
                return make_response( jsonify({ 'token': token, 'username': session['username']}), 200)
            else:
                return make_response( jsonify( {'message': 'Bad password'}), 401)
        else:
            return make_response( jsonify({'message': 'Bad username'}), 401)
    return make_response(jsonify({'message': 'Authentication required'}), 401)
    

@app.route("/api/v1.0/logout", methods=["GET"])
@jwt_required
def logout():
    token = request.headers['x-access-token']
    blacklist.insert_one({ "token": token})
    return make_response(jsonify({'message': 'Logout successful'}), 200)

@app.route("/api/v1.0/users", methods=["POST"])
def add_user():
    #check
    usernameT = None
    if "username" in request.form and "password" in request.form:
        if request.form["username"] != "" and request.form["password"] != "" and request.form["username"] != NULL and request.form["password"] != NULL:
            usernameT = request.form["username"]
            user = users.find_one( { "username": usernameT})
            if user is None:
                password = bytes(request.form["password"], 'utf-8') #needed for 'Unicode objects must be encoded before hashing'
                new_user = {
                    "username": request.form["username"],
                    "password": password,
                    "admin": False
                }
                new_user["password"] = bcrypt.hashpw(new_user["password"], bcrypt.gensalt())
                new_user_id = users.insert_one(new_user)
                #response
                new_user_link = "http://localhost:5000/api/v1.0/users/" + str(new_user_id.inserted_id)
                return make_response(jsonify({"url": new_user_link, "username": request.form["username"]}), 201) #only for postman testing. get rid of url and replace with 'message': 'user created successfully' when released
            else:
                return make_response(jsonify({"message": "user already exists. Please log in to this account on the login page or choose another username"}), 400)       
        else:
            return make_response(jsonify({"message": "Cannot have null data or an empty form"}), 400) 
    
    else:
            #catch
            return make_response(jsonify({"message": 'Wrong form data'}), 400)
    
    


#default flask run application
if __name__ == "__main__":
    app.run(debug = True)