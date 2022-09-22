from sqlalchemy.sql import func
import datetime, timeago
from .db import db
from .likes import likes


class Post(db.Model):
    __tablename__ = "posts"

    id = db.Column(db.Integer, primary_key=True)

    image_url = db.Column(db.String(255), nullable=False)
    caption = db.Column(db.String(255))
    location = db.Column(db.String(255))
    owner_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    created_at = db.Column(db.DateTime, server_default=func.now())
    updated_at = db.Column(db.DateTime, onupdate=func.now())


    #relationships
    user = db.relationship("User", back_populates="posts")

    likes = db.relationship("User", secondary=likes, back_populates='liked_posts')

    comments = db.relationship("Comment", back_populates="post", cascade="all, delete-orphan")

    #class methods
    def post_timeago(self):
        date = datetime.now()
        return timeago.format(self.created_at, date)


    #TO-DO: likes method
    def post_likes_count(self):
        return len(self.likes)


    def to_dict(self):
        return {
            "id": self.id,
            "caption": self.caption,
            "location": self.location,
            "image_url": self.image_url,
            "owner_id": self.owner_id,
            "created_at": self.created_at,
            "updated_at": self.updated_at,
            "user": self.user.to_dict(),
            "likes": [user.id for user in self.likes],
            "comments": [c.to_dict() for c in self.comments]
        }
