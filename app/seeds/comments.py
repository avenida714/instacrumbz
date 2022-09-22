from app.models import db, Comment


# Adds demo comments, you can add other posts here if you want
def seed_comments():
    comment1 = Comment(
        comment="Wow that looked so tasty!",
        user_id=2,
        post_id=1
    )
    comment2 = Comment(
        comment="Wish I could try that...",
        user_id=3,
        post_id=1
    )
    comment3 = Comment(
        comment="Yummy!",
        user_id=4,
        post_id=1
    )
    comment4 = Comment(
        comment="So many crumbs, I love it!",
        user_id=5,
        post_id=1
    )
    comment5 = Comment(
        comment="You demolished that...",
        user_id=6,
        post_id=1
    )
    comment6 = Comment(
        comment="What kind of sauce was on it?",
        user_id=7,
        post_id=1
    )
    comment7 = Comment(
        comment="Im jealous, that looked amazing!!!",
        user_id=1,
        post_id=4
    )
    comment8 = Comment(
        comment="How much was that?",
        user_id=2,
        post_id=4
    )
    comment9 = Comment(
        comment="Where did you go to eat?",
        user_id=3,
        post_id=4
    )
    comment10 = Comment(
        comment="Share next time!",
        user_id=4,
        post_id=5
    )
    comment11 = Comment(
        comment="Save me some next time?",
        user_id=6,
        post_id=5
    )
    comment12 = Comment(
        comment="What kind of sauce was on it?",
        user_id=7,
        post_id=5
    )
    comment13 = Comment(
        comment="Share next time!",
        user_id=4,
        post_id=6
    )
    comment14 = Comment(
        comment="Save me some next time?",
        user_id=5,
        post_id=6
    )
    comment15 = Comment(
        comment="What kind of sauce was on it?",
        user_id=7,
        post_id=6
    )
    comment16 = Comment(
        comment="Share next time!",
        user_id=4,
        post_id=7
    )
    comment17 = Comment(
        comment="Save me some next time?",
        user_id=5,
        post_id=7
    )
    comment18 = Comment(
        comment="What kind of sauce was on it?",
        user_id=6,
        post_id=7
    )


    db.session.add(comment1)
    db.session.add(comment2)
    db.session.add(comment3)
    db.session.add(comment4)
    db.session.add(comment5)
    db.session.add(comment6)
    db.session.add(comment7)
    db.session.add(comment8)
    db.session.add(comment9)
    db.session.add(comment10)
    db.session.add(comment11)
    db.session.add(comment12)
    db.session.add(comment13)
    db.session.add(comment14)
    db.session.add(comment15)
    db.session.add(comment16)
    db.session.add(comment17)
    db.session.add(comment18)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the comments table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_comments():
    db.session.execute('TRUNCATE comments RESTART IDENTITY CASCADE;')
    db.session.commit()
