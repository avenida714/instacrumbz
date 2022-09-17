from flask import Blueprint, redirect, url_for, render_template, request, jsonify
from flask_login import current_user, login_user, logout_user, login_required

# from ..models.post import Post
# from ..forms.post import PostForm
from ..models.post import Post
from ..forms.post_form import PostForm
from ..models.user import User
from ..models.db import db


post_routes = Blueprint('post', __name__)


# Get all post on the profile page of the current user
@post_routes.route("/all")
# @login_required
def get_all_post():
    # all_posts = Post.query.filter(Post.owner_id == current_user.id).order_by(Post.created_at.desc()).all()
    all_posts = Post.query.all()

    print("current_user.id **************************!!!", current_user)
    all_post_json = [post.to_dict() for post in all_posts]
    # print("all_post_json**************", all_post_json)
    return {"posts": all_post_json}


# CREATE A POST

# @login_required
@post_routes.route('/new-post', methods=['POST'])
def create_post():
    form = PostForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        new_post = Post(
            image_url = form.data['image_url'],
            caption = form.data['caption'],
            location = form.data['location'],
            owner_id = current_user.id,

        )
        db.session.add(new_post)
        db.session.commit()

        new_post = new_post.to_dict()
        new_post['post_owner'] = User.query.get(new_post['owner_id']).to_dict()

        return new_post

    else:
        return jsonify(form.errors)
