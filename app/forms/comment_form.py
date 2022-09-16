from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, url
from wtforms.fields import (
    BooleanField, SelectField, DateField, StringField, PasswordField, SubmitField, TextAreaField, TimeField, IntegerField, TextAreaField
)


class CommentForm(FlaskForm):
    comment = TextAreaField("Comment")
