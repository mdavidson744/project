from pymongo import MongoClient
import bcrypt

#-------------- FILE INFO

# use whenever the users db collection has been dropped.
# delete file (after ran) if deployed

# ---------------- / FILE INFO

client = MongoClient( "mongodb://127.0.0.1:27017")
db = client.projectV1
users = db.users

#creating default users & populating db slightly
user_list = [
    {   
        "username": "admin",
        "password": b"admin_s",
        "admin": True
        
    }
]

for new_user in user_list:
    new_user["password"] = bcrypt.hashpw(new_user["password"], bcrypt.gensalt())
    users.insert_one(new_user)