import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./FollowsList.css";
import "../../index.css";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const FollowsList = ({ currUser }) => {
  const history = useHistory();

  const [users, setUsers] = useState([]);

  const developers = [
    {
      name: "David Ting",
      pic: "https://avatars.githubusercontent.com/u/101853690?s=400&u=a7e10d2fbf72be60ea52c673f6d42487603651c6&v=4",
      linkedIn: "https://www.linkedin.com/in/da-wei-ting-cpa-a929b5102/",
      gitHubLink: "https://github.com/dwting0322",
    },
    {
      name: "Alec Venida",
      pic: "https://cdn.discordapp.com/attachments/1018992914304598116/1021828249329864725/photo_of_alec.jpeg",
      linkedIn: "https://www.linkedin.com/in/alec-venida-66793979",
      gitHubLink: "https://github.com/avenida714",
    },
    {
      name: "Ray Henry",
      pic: "https://media-exp1.licdn.com/dms/image/C5603AQGtB9-vlmW5fQ/profile-displayphoto-shrink_400_400/0/1647476258056?e=1669248000&v=beta&t=Z-g_YAIlnqs9vWygsFnMvuE8qLaHDjWzmP3787XF6EE",
      linkedIn: "https://www.linkedin.com/in/ray-charles-henry/",
      gitHubLink: "https://github.com/RayC206",
    },
    {
      name: "Rudy Nguyen",
      pic: "https://scontent-lax3-1.xx.fbcdn.net/v/t31.18172-8/26172278_1726421197388276_2617151693209782959_o.jpg?_nc_cat=110&ccb=1-7&_nc_sid=174925&_nc_ohc=SPIfJJTpf8IAX-UfAWO&_nc_ht=scontent-lax3-1.xx&oh=00_AT9iBjPTNdx1Qkd8P7M0Kai5IZvchnNgYdkKHoYSvRlP7g&oe=634F3519",
      linkedIn: "https://www.linkedin.com/in/rudy-nguyen-454b0a242/",
      gitHubLink: "https://github.com/rudyn2010",
    },
  ];

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("/api/users/");
      const responseData = await response.json();
      setUsers(responseData.users);
    }
    fetchData();
  }, []);


  const displayDevs = developers.map((dev, i) => (
    <div key={i} className="user-follow-header">
      <div className="user-img-fp">
        <img
          className="img circle no-cursor"
          src={dev?.pic || "https://i.stack.imgur.com/6M513.png"}
        />
      </div>
      <div>
        <div>{dev.name}</div>
        <div className="our-links">
          <a className="link lightgray" href={dev.gitHubLink}>
            GitHub
          </a>
          <a className="link lightgray" href={dev.linkedIn}>
            LinkedIn
          </a>
        </div>
      </div>
    </div>
  ));

  let followingList = currUser.following.map((each) => each.id);
  followingList.push(currUser.id);

  let notFollowing = users.filter((user) => !followingList.includes(user.id));

  const displayUsersToFollow = notFollowing.map((user, i) => (
    <NavLink key={i} to={`/profile/${user.id}`} className="user-follow-header">
      <div className="user-img-fp">
        <img
          className="img circle"
          src={user?.profile_img || "https://i.stack.imgur.com/6M513.png"}
        />
      </div>
      <div>
        <div>{user.name}</div>
      </div>
    </NavLink>
  ));

  const currUsersProfilePage = () => {
    let path = `/profile/${currUser.id}`;
    history.push(path);
  };

  return (
    <div className="follows-outer-container">
      <div className="user-follow-header">
        <div className="user-img-fp" onClick={currUsersProfilePage}>
          <img className="img circle" src={currUser.profile_img} />
        </div>
        <div>
          <div>{currUser.username}</div>
          <div className="lightgray">{currUser.name}</div>
        </div>
      </div>
      <div className="suggestions-divider darkgray">Suggestions For You</div>
      <div className="suggestions-list">{displayUsersToFollow}</div>
      <div className="suggestions-divider darkgray">Meet the Developers</div>
      <div className="suggestions-list">{displayDevs}</div>
    </div>
  );
};

export default FollowsList;
