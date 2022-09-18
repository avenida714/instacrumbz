from .db import db
from sqlalchemy.sql import func
import datetime, timeago


class Comment(db.Model):
    __tablename__ = "comments"

    id = db.Column(db.Integer, primary_key=True)

    comment = db.Column(db.String(2000), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    post_id = db.Column(db.Integer, db.ForeignKey('posts.id'), nullable=False)

    created_at = db.Column(db.DateTime, server_default=func.now())
    updated_at = db.Column(db.DateTime, onupdate=func.now())


    #relationships
    user = db.relationship("User", back_populates="comments")

    post = db.relationship('Post', back_populates="comments")


    #class methods
    def comment_timeago(self):
        date = datetime.now()
        return timeago.format(self.created_at, date)


    def to_dict(self):
        return {
            "id": self.id,
            "comment": self.comment,
            "user_id": self.user_id,
            "post_id": self.post_id,
            "created_at": self.created_at,
            "updated_at": self.updated_at,
            "user": self.user.to_dict()
        }
