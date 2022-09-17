import profile
from flask import Blueprint
from app.models import db, User
from app.forms.editProfile_form import editProfileForm
from flask_login import login_required, current_user


profile_route = Blueprint('profile', __name__, url_prefix='/profile')

@profile_route.route('/<int:userId>')
def profile_page(userId):
  userprofile = User.query.get(userId)
  res = {
    'profile': userprofile.to_dict()
  }

  return res

@profile_route.route('/edit/<int:userId>', methods=['PUT'])
def editProfile(userId):
  editForm = editProfileForm()
  userprofile = User.query.get(userId)
  print("-------")
  print(current_user.id)
  print("------")
  print(userId)
  print("-------")
  if userId == current_user.id:
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
  raise Exception("test error")
