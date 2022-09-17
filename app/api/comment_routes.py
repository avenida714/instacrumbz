from flask import Blueprint
from app.models import db, User, Post, Comment


comments_route = Blueprint("comments", __name__, url_prefix='/comments')

@comments_route.route("/<comment_id>")
def edit_comment():
  pass
