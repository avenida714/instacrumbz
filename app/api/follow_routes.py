from flask import Blueprint, jsonify, redirect
from flask_login import login_required, current_user
from app.models import db, follows, User

follow_routes = Blueprint('follows', __name__)


@follow_routes.route('/follow/<int:id>')
@login_required
def follow_user(id):

    user = User.query.get(id)

    # not following the user
    if current_user not in user.followers:
        user.followers.append(current_user)
        db.session.commit()
        return redirect("/")

    # user is already following user
    else:
        return


@follow_routes.route('/unfollow/<int:id>')
@login_required
def unfollow_user(id):

    user = User.query.get(id)

    # you are a follower
    if current_user in user.follows:
        user.followers.remove(current_user)
        db.session.commit()
        return redirect("/") #TO-DO: redirect or do something else

    # you aren't a follower
    else:
        return
