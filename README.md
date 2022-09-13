# Instacrumbz
## Welcome to InstaCrumbz, a project clone that we made of Instagram!
## About InstaCrumbz 
InstaCrumbz is a full-stack web application inspired by Instagram, with a little twist! 
Our application provides users the ability to post pictures of their finished meals, leave likes and add comments to said photos! 

With Instacrumbz, upload images of your dirty dishes and half eaten meals, and show everyone what you ate during the day. The more crumbs the better!

This project mimics Instagram's ability to share and post pictures on an online platform.

[Click Here to interact with InstaCrumbz Live Site]()

## Links to Project Wiki:

[API Routes](https://github.com/avenida714/instacrumbz/wiki/API-ROUTES)

[DB Schema](https://github.com/avenida714/instacrumbz/wiki/DB-SCHEMA)

[Features List](https://github.com/avenida714/instacrumbz/wiki/FEATURES)

[Redux State Shape](https://github.com/avenida714/instacrumbz/wiki/REDUX-STATE-SHAPE)


## Tech Stack: 

### Frameworks, Platforms, and Libraries:
Frontend: JavaScript, React, Redux, CSS, HTML:

Backend: Flask, Python

Database: SQLAlchemy, SQLite

Hosted On: Heroku / Docker

## How to Run Locally: 

1. Clone the github repository to a file location of your choice, recommend using "Download ZIP" in the Code dropdown menu for this repository. 

2. Run npm i && npm i -D in the Backend to install the appropriate Backend dependencies 

```
npm i && npm i -D
```

3. Create a .env file in the Backend folder and copy the contents below. Replace the <<insert secret key here>> with your own very secret key! 

```
SECRET_KEY= <<INSERT_SECRET_KEY_HERE>>
DATABASE_URL=sqlite:///dev.db
```

4. In the backend folder to initialize the database and run it in a virtual environment, first execute the command:
pipenv shell. Then migrate / seed database and run the Flask application after succesfully seeding with the following commands: 

```
pipenv shell
pipenv run flask db init
pipenv run flask db migrate
pipenv run flask db upgrade
pipenv run flask run 
```

5. Navigate to the Frontend folder and run npm i && npm i -D to install the appropriate Fackend dependencies

```
npm i && npm i -D
```

6. Run npm start in the Frontend folder

```
npm start
```

7. You should now be able to see the web application in your browser when you navigate to localhost:<<port number>> (Your preferred port number)!

## Features Directory: 

### Create and Register a New User

### Login Valid User or User Demo Login Page

### All Photos Feed 

### Create a New Post 

### Leave and Remove Likes

### Create New Comment for a post

### Edit a Comment

### Delete an Existing Comment from post

### Users Following & Photo Feed
