from app.models import db, Post


# Adds demo posts, you can add other posts here if you want
def seed_posts():
    post1 = Post(
        image_url="https://pbs.twimg.com/media/Efyxgr7XYAEHO18.jpg",
        caption="Do not touch my donuts!",
        location="USA",
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
        owner_id=2
    )
    post4 = Post(
        image_url="https://brghealth.com/brg/wp-content/uploads/2014/08/Dinner-plate-fork-knife-finished-eating.jpg",
        caption="Criss-cross, not apple sauce?",
        location="USA",
        owner_id=2
    )
    post5 = Post(
        image_url="http://images.fineartamerica.com/images-medium-large/crumbs-in-white-plate-sami-sarkis.jpg",
        caption="Crumbs, crumbs, crumbs!",
        location="USA",
        owner_id=3
    )
    post6 = Post(
        image_url="https://images.mygoodtimes.in/wp-content/uploads/2020/02/18063505/leftover-food.jpg",
        caption="Seconds?",
        location="USA",
        owner_id=3
    )
    post7 = Post(
        image_url="https://i.guim.co.uk/img/media/c4c4f854ac721bc932b9b4463f87cb20451e3c11/0_220_5616_3370/master/5616.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=60a375ac2327f5e438b789e0b9cbfa61",
        caption="Charcuterie, anyone?",
        location="USA",
        owner_id=4
    )


    post8 = Post(
        image_url="https://media.istockphoto.com/photos/directly-above-view-of-a-partially-eaten-plate-of-pancakes-and-fruit-picture-id805241820?k=20&m=805241820&s=170667a&w=0&h=WuLhUj4Ob1uUwrtJc_5MxzIzpfs0b9_AtXHg5PxnDtY=",
        caption="Flap Jacks",
        location="iHop",
        owner_id=4
    )
    post9 = Post(
        image_url="http://www.freeimageslive.com/galleries/food/misc/pics/chipshop4130.jpg",
        caption="Fried Potato Slices",
        location="USA",
        owner_id=5
    )
    post10 = Post(
        image_url="https://lovechicliving.co.uk/wp-content/uploads/2014/11/Dirty-dishes.jpg",
        caption="Peas and Thank you!",
        location="USA",
        owner_id=5
    )
    post11 = Post(
        image_url="https://pbs.twimg.com/media/Cd6NthMWIAEaoFs.jpg",
        caption="Borgir",
        location="USA",
        owner_id=6
    )
    post12 = Post(
        image_url="https://thumbs.dreamstime.com/b/chicken-wings-gnawed-isolated-white-background-chicken-wings-gnawed-isolated-white-background-212968171.jpg",
        caption="Wing Wednesdays!",
        location="Wing Stop",
        owner_id=6
    )
    post13 = Post(
        image_url="https://static.wixstatic.com/media/334d9e_e1d859b564f84aee91deaef86e48f1ac~mv2.jpeg/v1/fill/w_1000,h_1000,al_c,q_90,usm_0.66_1.00_0.01/334d9e_e1d859b564f84aee91deaef86e48f1ac~mv2.jpeg",
        caption="Cakin'",
        location="USA",
        owner_id=7
    )
    post14 = Post(
        image_url="https://www.simplemost.com/wp-content/uploads/2020/09/AdobeStock_318627044.jpg",
        caption="Pizza pizza!",
        location="USA",
        owner_id=7
    )
    post15 = Post(
        image_url="https://thumbs.dreamstime.com/b/one-pizza-slice-crumbs-cutlery-eating-concept-last-dinner-purple-background-crust-eaten-context-italian-salami-164364598.jpg",
        caption="useEfork",
        location="App Academy",
        owner_id=8
    )
    post16 = Post(
        image_url="https://images.squarespace-cdn.com/content/v1/5508c899e4b0a308ed6ba859/1478060434636-LESCG5BUFVOWOSK2IQ8J/image-asset.jpeg",
        caption="Spammin'",
        location="USA",
        owner_id=8
    )
    post17 = Post(
        image_url="https://images.happycow.net/venues/1024/13/06/hcmp130628_685490.jpeg",
        caption="Fish Filet",
        location="USA",
        owner_id=9
    )
    post18 = Post(
        image_url="https://live.staticflickr.com/3458/5763315738_6cccc99627_b.jpg",
        caption="Meeaaattt...",
        location="USA",
        owner_id=9
    )
    post19 = Post(
        image_url="https://media-cdn.tripadvisor.com/media/photo-s/1a/97/63/b0/slurp-smooth.jpg",
        caption="Itadakimasu",
        location="USA",
        owner_id=10
    )
    post20 = Post(
        image_url="https://www.rareseeds.com/media/catalog/product/cache/4f71e30e38ffe1b90b59b74efe76a4b8/e/g/eggplant-aswad-and-cyan-lss-dsc_2455.gif",
        caption="Twinning",
        location="USA",
        owner_id=10
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

    db.session.add(post8)
    db.session.commit()

    db.session.add(post9)
    db.session.commit()

    db.session.add(post10)
    db.session.commit()

    db.session.add(post11)
    db.session.commit()

    db.session.add(post12)
    db.session.commit()

    db.session.add(post13)
    db.session.commit()

    db.session.add(post14)
    db.session.commit()

    db.session.add(post15)
    db.session.commit()

    db.session.add(post16)
    db.session.commit()

    db.session.add(post17)
    db.session.commit()

    db.session.add(post18)
    db.session.commit()

    db.session.add(post19)
    db.session.commit()

    db.session.add(post20)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE the posts table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_posts():
    db.session.execute('TRUNCATE posts RESTART IDENTITY CASCADE;')
    db.session.commit()
