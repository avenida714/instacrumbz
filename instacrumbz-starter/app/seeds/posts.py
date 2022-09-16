from app.models import db, Post


# Adds demo posts, you can add other posts here if you want
def seed_posts():
    post1 = Post(

    )
    post2 = Post(

    )
    post3 = Post(

    )

    db.session.add(post1)
    db.session.add(post2)
    db.session.add(post3)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the posts table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_posts():
    db.session.execute('TRUNCATE posts RESTART IDENTITY CASCADE;')
    db.session.commit()
