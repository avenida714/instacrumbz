from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired

class editProfileForm(FlaskForm):
  username = StringField("Username", validators=[DataRequired()])
  bio = StringField("Bio")
  email = StringField("Email", validators=[DataRequired()])
  gender = StringField("Gender")
  name = StringField("name")
  profile_img = StringField("Profile Image URL")
