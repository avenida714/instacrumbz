import profile
from flask import Blueprint
from app.models import db, User
from app.forms.editProfile_form import editProfileForm


profile_route = Blueprint('profile', __name__, url_prefix='/profile')

@profile_route.route('/<userId>')
def profile_page(userId):
  userprofile = User.query.get(userId)
  res = {
    'profile': userprofile.to_dict()
  }

  return res

@profile_route.route('/edit/<userId>')
def editProfile(userId):
  editForm = editProfileForm()

  userprofile = User.query.get(userId)

  username = editForm.data['username']
  bio = editForm.data['bio']
  email = editForm.data['email']
  gender = editForm.data['gender']
  profileimage = editForm.data['profile_img']

  userprofile.username = username
  userprofile.bio = bio
  userprofile.email = email
  userprofile.gender = gender
  userprofile.profileimage = profileimage

  db.session.commit()
  return userprofile.to_dict()
