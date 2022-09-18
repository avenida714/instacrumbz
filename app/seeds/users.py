import profile
from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo',
        email='demo@aa.io',
        name='Demo',
        bio='Im Demo',
        gender='Robot',
        profile_img='img.jpeg',
        password='password'
        )
    marnie = User(
        username='Marnie',
        email='marnie@aa.io',
        name='Marnie',
        bio='Im Marnie',
        gender='Female',
        profile_img='img.jpeg',
        password='password'
        )
    bobbie = User(
        username='Bobbie',
        email='bobbie@aa.io',
        name='Bobbie',
        bio='Im Bobbie',
        gender='Male',
        profile_img='img.jpeg',
        password='password'
        )
    david = User(
        username='David',
        email='david@aa.io',
        name='David Ting',
        bio='Hi, Im David Ting',
        gender='Male',
        profile_img='img.jpeg',
        password='password'
        )
    alec = User(
        username='Alec',
        email='alec@aa.io',
        name='Alec Venida',
        bio='Hi, Im Alec Venida',
        gender='Male',
        profile_img='img.jpeg',
        password='password'
        )
    ray = User(
        username='Ray',
        email='ray@aa.io',
        name='Ray Henry',
        bio='Hi, Im Ray Henry',
        gender='Male',
        profile_img='img.jpeg',
        password='password'
        )
    rudy = User(
        username='Rudy',
        email='rudy@aa.io',
        name='Rudy Nguyen',
        bio='Hi, Im Rudy Nguyen',
        gender='Male',
        profile_img='img.jpeg',
        password='password'
        )


    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.add(david)
    db.session.add(alec)
    db.session.add(ray)
    db.session.add(rudy)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
