from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError, url
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')

def urlCheck(form,field):
    imageurl = field.data
    if  ("jpg" or "png" or "jpeg" or "gif") not in imageurl:
        raise ValidationError("URL must be a jpg, jpeg, png , or gif")


class SignUpForm(FlaskForm):
    username = StringField('username', validators=[DataRequired(), username_exists])
    name = StringField('name', validators=[DataRequired()])
    email = StringField('email', validators=[DataRequired(), user_exists])
    password = StringField('password', validators=[DataRequired()])
    # profile_img = StringField('profile_img', validators=[DataRequired()])
