from app.models import db, Post


# Adds demo posts, you can add other posts here if you want
def seed_posts():
    post1 = Post(
        image_url="preview.jpg",
        caption="Good food",
        location="USA",
        owner_id=1
    )
    post2 = Post(
        image_url="preview.jpg",
        caption="Good food 2",
        location="USA",
        owner_id=1
    )
    post3 = Post(
        image_url="preview.jpg",
        caption="Good food 3",
        location="USA",
        owner_id=1
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
