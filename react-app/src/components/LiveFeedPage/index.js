import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useHistory } from "react-router-dom";

import { getAllPosts } from "../../store/posts";
// import RudyComponent from PostCard
import "./LiveFeedPage.css";
import "../../index.css";
import PostCard from "../PostCard";
import FollowsList from "../FollowsList";
import { getPostComment } from "../../store/comment";
import { loadUserRequest } from "../../store/session";

const LiveFeedPage = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  const postObj = useSelector((state) => state.posts);
  // console.log("***********THIS IS THE POST OBJECT *************", postObj)

  const posts = Object.values(postObj);
  // console.log("***********THIS IS OBJECT.values(postObj)*************", posts)

  posts.reverse();

  const currUser = useSelector((state) => {
    // console.log("STATE CURRUSER");
    // console.log(state.profile.profile && state.profile.profile[0].id);
    // console.log(state.session.user.id);
    // if (
    //   state.profile.profile &&
    //   state.profile.profile[0].id === state.session.user.id
    // ) {
    //   return state.profile.profile[0];
    // }
    return state.session.user;
  });
  console.log("CURRUSER");
  console.log(currUser);
  const commentObj = useSelector((state) => state.comment);
  let allComments;
  if (commentObj) allComments = Object.values(commentObj);

  const displayPosts = posts.map((post, i) => (
    <PostCard key={i} post={post} currUser={currUser} />
  ));

  // const displayFollows = User.follows.map(); //

  useEffect(() => {
    dispatch(getAllPosts()).then(() => {
      dispatch(loadUserRequest(currUser.id)); // update state.session.user
      setIsLoaded(true);
    });
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
