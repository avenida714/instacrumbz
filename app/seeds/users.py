import profile
from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='demo',
        email='demo@aa.io',
        name='Demo',
        bio='I am the Demo User!',
        gender='Robot',
        profile_img='https://i.pinimg.com/originals/6a/b6/68/6ab668f8c2341f45c8f2d183bbcc8332.jpg',
        password='password'
        )
    marnie = User(
        username='marnie123',
        email='marnie@aa.io',
        name='Marnie',
        bio='Marnie the Marine Biologist',
        gender='Female',
        profile_img='https://cdnb.artstation.com/p/assets/images/images/020/071/433/large/joshua-carreras-marge-simpson-posted-to-x.jpg?1566245506',
        password='password',
        followers=[demo]
        )
    bobbie = User(
        username='bobbie',
        email='bobbie@aa.io',
        name='Bobbie',
        bio='Ricky Bobbie! Yeah!',
        gender='Male',
        profile_img='https://cdnb.artstation.com/p/assets/images/images/035/287/409/large/nathan-renoir-javier-bart-simpson-fanart-final.jpg?1614602553',
        password='password',
        followers=[demo, marnie]
        )
    fred = User(
        username='fredflinstone',
        email='fred@aa.io',
        name='Fred Flintstone',
        bio='The real Fred Flinstone',
        gender='Male',
        profile_img='https://assets.dragoart.com/images/378_501/how-to-draw-fred-flintstone_5e4c71b7472074.16871918_2326_3_4.jpg',
        password='password',
        followers=[demo, marnie, bobbie]
        )
    kangaskhan = User(
        username='kangaskhan',
        email='kangaskhan@aa.io',
        name='Kangaskhan',
        bio='Im a Pokemon!',
        gender='Male',
        profile_img='https://static.pokemonpets.com/images/monsters-images-800-800/115-Kangaskhan.webp',
        password='password',
        followers=[marnie, bobbie, fred]
        )
    snorlax = User(
        username='snoringlax',
        email='snorlax@aa.io',
        name='Snorlax',
        bio='Always sleeping, always hungry...',
        gender='Male',
        profile_img='https://staticc.sportskeeda.com/editor/2022/06/25cd1-16557699256455.png',
        password='password',
        followers=[marnie, bobbie, fred, kangaskhan]
        )
    dragonite = User(
        username='dragonite',
        email='dragonite@aa.io',
        name='Dragonite',
        bio='Cute and cuddly :)',
        gender='Male',
        profile_img='https://assets.pokemon.com/assets/cms2/img/pokedex/full/149.png',
        password='password',
        followers=[marnie, bobbie, fred, kangaskhan, snorlax]
        )


    db.session.add(demo) #1
    db.session.commit()

    db.session.add(marnie) #2
    db.session.commit()

    db.session.add(bobbie) #3
    db.session.commit()

    db.session.add(fred) #4
    db.session.commit()

    db.session.add(kangaskhan) #5
    db.session.commit()

    db.session.add(snorlax) #6
    db.session.commit()

    db.session.add(dragonite) #7
    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
