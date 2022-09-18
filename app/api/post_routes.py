from flask import Blueprint, redirect, url_for, render_template, request, jsonify
from flask_login import current_user, login_user, logout_user, login_required

# from ..models.post import Post
# from ..forms.post import PostForm
from ..models.post import Post
from ..forms.post_form import PostForm
from ..models.user import User
from ..models.db import db
from ..models.comment import Comment
from ..forms.comment_form import CommentForm

post_routes = Blueprint('post', __name__)


# Get all post
@post_routes.route("/all")
@login_required
def get_all_post():
    if current_user:
        all_posts = Post.query.all()

        print("current_user.id **************************!!!", current_user)
        all_post_json = [post.to_dict() for post in all_posts]
        return {"posts": all_post_json}
    else:
        return {'message': 'Unauthorized user', "statusCode": 403}




# Get all post of the current user
@post_routes.route("/current")
@login_required
def get_current_post():
    current_posts = Post.query.filter(Post.owner_id == current_user.id).order_by(Post.created_at.desc()).all()
    current_posts_json = [current_post.to_dict() for current_post in current_posts]
    return {"current_posts": current_posts_json}



#get one post
@post_routes.route('/<int:id>')
@login_required
def get_one_post(id):
     post = Post.query.get(id)
     return post.to_dict()



#get all post by user id
@post_routes.route('/users/<int:id>')
@login_required
def get_posts_by_id(id):
    all_posts_by_id = Post.query.filter(Post.owner_id == id).order_by(Post.created_at.desc()).all()
    all_posts_by_id_json = [post.to_dict() for post in all_posts_by_id]
    return {"posts": all_posts_by_id_json}






# CREATE A POST
@post_routes.route('/posts/new-post', methods=['POST'])
@login_required

def create_post():
    form = PostForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        new_post = Post(
            image_url = form.data['image_url'],
            caption = form.data['caption'],
            location = form.data['location'],
            owner_id = current_user.id
        )
        db.session.add(new_post)
        db.session.commit()

        new_post = new_post.to_dict()
        new_post['post_owner'] = User.query.get(new_post['owner_id']).to_dict()

        return new_post

    else:
        return jsonify(form.errors)

# Update a post
@post_routes.route('/posts/<int:id>/edit', methods=['PUT'])
@login_required
def edit_post(id):
    form = PostForm()
    new_post = Post.query.get_or_404(id)
    # print("current_user********************begining", current_user.id)
    if current_user.id != new_post.id:
        return {"message": "You don't have authorization to update", "statusCode": 403}

    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        # print("form.data***********************", form.data)
        new_post.image_url = form.data['image_url']
        new_post.caption = form.data['caption']
        new_post.location = form.data['location']


        db.session.commit()
        # print("new_post********************", new_post.to_dict())
        # print("new_post********************", new_post)

        return  new_post.to_dict()

    else:
        return jsonify(form.errors)


#Delete a post

@post_routes.delete('/<int:id>')
@login_required
def delete_post(id):


    post = Post.query.get(id)
    print('current_user.id******************** ', current_user.id)
    print('Post.owner_id******************** ', post.owner_id)
    if current_user.id == post.owner_id:

        db.session.delete(post)
        db.session.commit()
        return {'message': 'Successfully deleted'}
    else:
        return {'message': 'Unauthorized user', "statusCode": 403}



# create a comment
@post_routes.route("/post/<int:id>/comment-new", methods = ["POST"])
@login_required
def create_comment(id):
    form = CommentForm()
    user_id = current_user.id
    print("user_id**************", user_id)
    # user_id = form.data['user_id']
    # post_id = form.data['post_id']
    # comment = form.data['comment']
    post = Post.query.get_or_404(id)
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
