from flask import Blueprint, jsonify, redirect, request
from flask_login import login_required, current_user
from app.models import db, User, Comment, Post
from ..forms.comment_form import CommentForm



comment_routes = Blueprint('comments', __name__)


#DELETE COMMENT
@comment_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_comment(id):

    comment = Comment.query.get_or_404(id) # special query method that finds it, or returns a 404

    print("this is the comment ------>", comment)

    if current_user.id == comment.user_id:

        db.session.delete(comment)
        db.session.commit()
        return {'message': 'Successfully deleted'}
    else:
        return {'message': 'Unauthorized user', "statusCode": 403}

#EDIT A COMMENT
@comment_routes.route('/<int:id>', methods=['PUT'])
@login_required
def edit_comment(id):

    edited_comment = Comment.query.get(id)
    post = Post.query.get(id)

    form = CommentForm()
    user_id = current_user.id

    form['csrf_token'].data = request.cookies['csrf_token']
    print("edited comment and user id ----->", edited_comment.user_id, current_user.id)



    # if form.validate_on_submit() and
    if current_user.id == edited_comment.user_id:
        print("THIS IS THE DATA FROM FORM:", form.data)

        # edited_comment.user_id = user_id
        # edited_comment.post_id = post.id
        edited_comment.comment = form.data['comment']

        db.session.commit()
        return edited_comment.to_dict()
    else:
        return {'message': 'Unauthorized user', "statusCode": 403}
