from app.models import db, Post


# Adds demo posts, you can add other posts here if you want
def seed_posts():
    post1 = Post(
        image_url="preview.jpg",
        caption="Demo User Post 1",
        location="USA",
        owner_id=1
    )
    post2 = Post(
        image_url="preview.jpg",
        caption="Demo User Post 2",
        location="USA",
        owner_id=1
    )
    post3 = Post(
        image_url="preview.jpg",
        caption="Demo User Post 3",
        location="USA",
        owner_id=1
    )
    post4 = Post(
        image_url="preview.jpg",
        caption="David Test Post 1",
        location="USA",
        owner_id=4
    )
    post5 = Post(
        image_url="preview.jpg",
        caption="Alec Test Post 1",
        location="USA",
        owner_id=5
    )
    post6 = Post(
        image_url="preview.jpg",
        caption="Ray Test Post 1",
        location="USA",
        owner_id=6
    )
    post7 = Post(
        image_url="preview.jpg",
        caption="Rudy Test Post 1",
        location="USA",
        owner_id=7
    )


    db.session.add(post1)
    db.session.add(post2)
    db.session.add(post3)
    db.session.add(post4)
    db.session.add(post5)
    db.session.add(post6)
    db.session.add(post7)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the posts table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_posts():
    db.session.execute('TRUNCATE posts RESTART IDENTITY CASCADE;')
    db.session.commit()
