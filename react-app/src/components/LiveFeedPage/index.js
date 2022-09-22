import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useHistory } from "react-router-dom";

import { getAllPosts } from "../../store/posts";
// import RudyComponent from PostCard
import "./LiveFeedPage.css";
import "../../index.css";
import PostCard from "../PostCard";
import FollowsList from "../FollowsList";

const LiveFeedPage = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  const postObj = useSelector((state) => state.posts);
  // console.log("***********THIS IS THE POST OBJECT *************", postObj)

  const posts = Object.values(postObj);
  // console.log("***********THIS IS OBJECT.values(postObj)*************", posts)

  posts.reverse();

  const currUser = useSelector((state) => state.session.user);

  const displayPosts = posts.map((post, i) => (
    <PostCard key={i} post={post} currUser={currUser} />
  ));

  // const displayFollows = User.follows.map(); //

  useEffect(() => {
    dispatch(getAllPosts()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    isLoaded && (
      <div className="outter-most-wrapper">
        <div className="live-feed-display" /* container for comments */>
          {displayPosts}
        </div>
        <div className="live-feed-follows">
          <FollowsList currUser={currUser} />
        </div>
      </div>
    )
  );
};

export default LiveFeedPage;
