# Instacrumbz
## Welcome to Instacrumbz, our project clone of Instagram.
## About Our Web Application!
InstaCrumbz is a full-stack web application inspired by Instagram, with a little twist! 
Our application provides users the ability to post pictures of their finished meals, leave likes and add comments to said photos! 

With Instacrumbz, upload images of your dirty dishes and half eaten meals, and show everyone what you ate during the day. The more crumbs the better!

This project mimics Instagram's ability to share and post pictures on an online platform.

[Instacrumbz Live Site](https://instacrumbz.herokuapp.com/login)

## Project Wiki Links:

[API Routes](https://github.com/avenida714/instacrumbz/wiki/API-ROUTES)

[DB Schema](https://github.com/avenida714/instacrumbz/wiki/DB-SCHEMA)

[Features List](https://github.com/avenida714/instacrumbz/wiki/FEATURES)

[User Stories](https://github.com/avenida714/instacrumbz/wiki/USER-STORIES)


## Tech Stack: 

### Languages, Frameworks, Platforms, and Libraries:

Frontend: 

![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E) ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white) ![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white) ![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)

Backend: 

![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54) ![Flask](https://img.shields.io/badge/flask-%23000.svg?style=for-the-badge&logo=flask&logoColor=white) ![SQLite](https://img.shields.io/badge/sqlite-%2307405e.svg?style=for-the-badge&logo=sqlite&logoColor=white) ![SQLAlchemy](https://img.shields.io/badge/-SQLAlchemy-red?style=for-the-badge)


Hosted On: 

![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white) ![Heroku](https://img.shields.io/badge/heroku-%23430098.svg?style=for-the-badge&logo=heroku&logoColor=white)

## How to Run Locally: 

1. Clone the github repository to a file location of your choice, recommend using "Download ZIP" in the Code dropdown menu for this repository. 

2. Run **pipenv install -r requirements.txt** in the app directory to install the appropriate dependencies: 

```
pipenv install -r requirements.txt
```

While those dependencies are installing, you may also open up a seperate integrated terminal, and ** npm install ** the appropriate dependencies to the react-app folder. 
```
npm install 
```

3. Create a .env file in the root of the **app** folder and copy the contents below. Replace the **insert secret key here** with your **own** very secret key! 

```
SECRET_KEY= <<INSERT_SECRET_KEY_HERE>>
DATABASE_URL=sqlite:///dev.db
```

4. While still in the **app** folder, get into your pipenv, migrate your database, seed your database, and run your Flask app:

```
pipenv shell
pipenv run flask db init
pipenv run flask db migrate
pipenv run flask db upgrade
pipenv run flask run 
```

6. Run **npm start** in the Frontend folder:

```
npm start
```

7. You should now be able to see the web application in your browser when you navigate to localhost!

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
