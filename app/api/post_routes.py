from flask import Blueprint, redirect, url_for, render_template, request, jsonify
from flask_login import current_user, login_user, logout_user, login_required

# from ..models.post import Post
# from ..forms.post import PostForm
from ..models.post import Post
from ..forms.post_form import PostForm


bp = Blueprint('main', __name__, url_prefix="/api")


@bp.route("/all")
@login_required
def get_all_post():
    all_posts = Post.query.order_by(Post.created_at.desc()).all()
    return all_posts
