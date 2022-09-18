from flask import Blueprint, jsonify, redirect, request
from flask_login import login_required, current_user
from app.models import db, User, Comment, Post
from ..forms.comment_form import CommentForm


comment_routes = Blueprint('comments', __name__)


#EDIT A COMMENT
@comment_routes.route('/<int:id>', methods=['PUT'])
@login_required
def edit_comment(id):

    form = CommentForm()
    edited_comment = Comment.query.get_or_404(id)

    if current_user.id != edited_comment.user_id:
        return {"message": "You don't have authorization to update", "statusCode": 403}

    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        edited_comment.comment = form.data['comment']
        db.session.commit()
        return edited_comment.to_dict()
    else:
        return {'message': 'Unauthorized user', "statusCode": 403}


#DELETE COMMENT
@comment_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_comment(id):

    comment = Comment.query.get_or_404(id) # special query method that finds it, or returns a 404

    if current_user.id == comment.user_id:

        db.session.delete(comment)
        db.session.commit()
        return {'message': 'Successfully deleted'}
    else:
        return {'message': 'Unauthorized user', "statusCode": 403}
