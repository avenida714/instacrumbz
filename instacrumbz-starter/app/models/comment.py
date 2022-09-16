from .db import db
from sqlalchemy.sql import func


class Comment(db.Model):
    __tablename__ = "comments"

    id = db.Column(db.Integer, primary_key=True)

    comment = db.Column(db.String(2000), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    post_id = db.Column(db.Integer, db.ForeignKey('posts.id'), nullable=False)

    created_at = db.Column(
        db.DateTime, server_default=func.now(), nullable=False
    )
    updated_at = db.Column(
        db.DateTime, server_default=func.now(), onupdate=func.now, nullable=False
    )


    #relationships


    #class methods
    def to_dict(self):
        return {
            "id": self.id,
            "comment": self.comment,
            "user_id": self.user_id,
            "post_id": self.post_id,
            "created_at": self.created_at
        }
