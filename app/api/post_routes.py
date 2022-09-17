from flask import Blueprint, redirect, url_for, render_template, request, jsonify
from flask_login import current_user, login_user, logout_user, login_required

# from ..models.post import Post
# from ..forms.post import PostForm
from ..models.post import Post
from ..forms.post_form import PostForm


post_routes = Blueprint('post', __name__)


# Get all post on the profile page of the current user
@post_routes.route("/all")
# @login_required
def get_all_post():
    # all_posts = Post.query.filter(Post.owner_id == current_user.id).order_by(Post.created_at.desc()).all()
    all_posts = Post.query.all()
    
    print("current_user.id **************************", current_user)
    all_post_json = [post.to_dict() for post in all_posts]
    # print("all_post_json**************", all_post_json)
    return {"posts": all_post_json}
