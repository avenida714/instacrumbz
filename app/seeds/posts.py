from app.models import db, Post


# Adds demo posts, you can add other posts here if you want
def seed_posts():
    post1 = Post(
        image_url="https://lovechicliving.co.uk/wp-content/uploads/2014/11/Dirty-dishes.jpg",
        caption="Peas and thank you!",
        location="Grandma's",
        owner_id=1
    )
    post2 = Post(
        image_url="https://c2.staticflickr.com/6/5241/5255943248_665bd55501_b.jpg",
        caption="Winner Winner Chicken Dinner!",
        location="USA",
        owner_id=1
    )
    post3 = Post(
        image_url="https://thumbor.thedailymeal.com/eChHs6UmjIXEmt_uLgTcVIEtH8g=/840x565/https://www.thedailymeal.com/sites/default/files/2018/06/20/20_Not_finished_food_on_plate_istock_edit.jpg",
        caption="Mom's Spaghetti, knees weak arms are heavy...",
        location="USA",
        owner_id=1
    )
    post4 = Post(
        image_url="https://brghealth.com/brg/wp-content/uploads/2014/08/Dinner-plate-fork-knife-finished-eating.jpg",
        caption="Criss-cross, not apple sauce?",
        location="USA",
        owner_id=4
    )
    post5 = Post(
        image_url="http://images.fineartamerica.com/images-medium-large/crumbs-in-white-plate-sami-sarkis.jpg",
        caption="Crumbs, crumbs, crumbs!",
        location="USA",
        owner_id=5
    )
    post6 = Post(
        image_url="https://images.mygoodtimes.in/wp-content/uploads/2020/02/18063505/leftover-food.jpg",
        caption="Seconds?",
        location="USA",
        owner_id=6
    )
    post7 = Post(
        image_url="https://i.guim.co.uk/img/media/c4c4f854ac721bc932b9b4463f87cb20451e3c11/0_220_5616_3370/master/5616.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=60a375ac2327f5e438b789e0b9cbfa61",
        caption="Charcuterie, anyone?",
        location="USA",
        owner_id=7
    )


    db.session.add(post1)
    db.session.commit()

    db.session.add(post2)
    db.session.commit()

    db.session.add(post3)
    db.session.commit()

    db.session.add(post4)
    db.session.commit()

    db.session.add(post5)
    db.session.commit()

    db.session.add(post6)
    db.session.commit()

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
