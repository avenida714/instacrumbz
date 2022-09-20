from flask import Blueprint, request
from app.models import db, User, Post
from app.forms.editProfile_form import editProfileForm
from flask_login import login_required, current_user


profile_route = Blueprint('profile', __name__)


#GET PROFILE
@profile_route.route('/<int:userId>')
def profile_page(userId):
  userprofile = User.query.get(userId)
  profile = [userprofile.to_dict()]
  allposts = Post.query.filter(Post.owner_id == userId).all()
  posts = [post.to_dict() for post in allposts]
  res = {
    'profile': profile,
    'posts': posts
  }
  return res


#EDIT PROFILE
@profile_route.route('/edit/<int:userId>', methods=['PUT'])
@login_required
def editProfile(userId):
  editForm = editProfileForm()
  editForm['csrf_token'].data = request.cookies['csrf_token']
  userprofile = User.query.get(userId)
  #check if profile exist / throws 404
  if not userprofile:
    return {'message': 'Profile does not exist', "statusCode": 404}
  #check if logged in user is profile owner / throw 403
  if userId == current_user.id:
    name = editForm.data['name']
    bio = editForm.data['bio']
    gender = editForm.data['gender']
    profile_img = editForm.data['profile_img']


    userprofile.name = name
    userprofile.bio = bio
    userprofile.gender = gender
    userprofile.profile_img = profile_img

    db.session.commit()
    return userprofile.to_dict()
  else:
    return {'message': 'Unauthorized user', "statusCode": 403}

