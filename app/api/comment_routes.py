from flask import Blueprint, jsonify, redirect
from flask_login import login_required, current_user
from app.models import db, User, Comment
from ..forms.comment_form import CommentForm


comment_routes = Blueprint('comments', __name__)


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

#EDIT A COMMENT
@comment_routes.route('/<int:id>', methods=['PUT'])
@login_required
def edit_comment(id):

    comment = Comment.query.get_or_404(id)

    form = CommentForm()
    user_id = current_user.id

    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        comment = Comment(
        user_id = user_id,
        post_id = post.id,
        comment = form.data['comment']
        )

        db.session.add(comment)
        db.session.commit()
        return comment.to_dict()
    else:
        raise Exception("Unauthorized user")
