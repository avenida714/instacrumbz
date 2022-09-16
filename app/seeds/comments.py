from app.models import db, Comment


# Adds demo comments, you can add other posts here if you want
def seed_comments():
    comment1 = Comment(
        comment="Wow that looked so tasty",
        user_id=2,
        post_id=1
    )
    comment2 = Comment(
        comment="Wish I could try that",
        user_id=3,
        post_id=1
    )
    comment3 = Comment(
        comment="Yummy",
        user_id=2,
        post_id=2
    )

    db.session.add(comment1)
    db.session.add(comment2)
    db.session.add(comment3)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the comments table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_comments():
    db.session.execute('TRUNCATE comments RESTART IDENTITY CASCADE;')
    db.session.commit()
