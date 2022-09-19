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
  print("_---------------------", allposts)
  res = {
    'profile': profile,
    'posts': posts
  }
  return res


#EDIT PROFILE
@profile_route.route('/<int:userId>', methods=['PUT'])
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
    username = editForm.data['username']
    bio = editForm.data['bio']
    email = editForm.data['email']
    gender = editForm.data['gender']
    name = editForm.data['name']
    profileimage = editForm.data['profile_img']

    userprofile.username = username
    userprofile.bio = bio
    userprofile.email = email
    userprofile.gender = gender
    userprofile.name = name
    userprofile.profileimage = profileimage

    db.session.commit()
    return userprofile.to_dict()
  else:
    return {'message': 'Unauthorized user', "statusCode": 403}


# # Follow and Unfollow Profile Feature
# @profile_route.route('/<int:id>/profile_follows')
# @login_required
# def follow_unfollow_profile(id):

#     user = User.query.get_or_404(id)

#     if current_user not in user.followers:
#         user.followers.append(current_user)
#         db.session.commit()
#     else:
#         user.followers.remove(current_user)
#         db.session.commit()

#     return {'user': user.to_dict()}
