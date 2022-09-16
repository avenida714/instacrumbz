#Added
from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, url
from wtforms.fields import (
    BooleanField, SelectField, DateField, StringField, PasswordField, SubmitField, TextAreaField, TimeField, IntegerField, TextAreaField
)


class PostForm(FlaskForm):
    caption = TextAreaField("Caption")
    location = StringField("Location")
    image_url = StringField("Url", validators=[DataRequired(), url()])
