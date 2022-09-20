from flask import Blueprint, jsonify, redirect
from flask_login import login_required, current_user
from app.models import db, follows, User

follow_routes = Blueprint('follows', __name__)


@follow_routes.route('/profile_follows/<int:id>', methods =['PUT'])
@login_required
def follow_unfollow_user(id):

    user = User.query.get_or_404(id)

    if current_user not in user.followers:
        user.followers.append(current_user)
        db.session.commit()
    else:
        user.followers.remove(current_user)
        db.session.commit()

    return {'user': user.to_dict()}
