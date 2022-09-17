from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin

#imports here
from .follows import follows
from .likes import likes


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)

    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)

    name = db.Column(db.String(50), nullable=False)
    bio = db.Column(db.String(500))
    gender = db.Column(db.String(50))
    profile_img = db.Column(db.String(255))


    #relationships
    #check Many-to-Many SQLAlchemy Cheatsheet for follows
    followers = db.relationship(
        "User",
        secondary=follows,
        primaryjoin=(follows.c.follower_id == id),
        secondaryjoin=(follows.c.followed_id == id),
        backref=db.backref("following", lazy="dynamic"),
        lazy="dynamic"
    )

    posts = db.relationship('Post', back_populates="user", cascade="all, delete-orphan")

    comments = db.relationship("Comment", back_populates="user", cascade="all, delete-orphan")

    liked_posts = db.relationship('Post', secondary=likes, back_populates='liked', cascade='all, delete-orphan')

    #class methods
    @property
    def password(self):
        return self.hashed_password


    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)


    def check_password(self, password):
        return check_password_hash(self.password, password)


    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'name': self.name,
            'bio': self.bio,
            'gender': self.gender,
            'profile_img': self.profile_img,
            'followers': [{user.id, user.name} for user in self.followers],
            'following': [{user.id, user.name} for user in self.following]
        }
