import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, NavLink } from "react-router-dom";

import { getAllPosts } from '../../store/posts';
// import RudyComponent from PostCard
import PostCard from '../PostCard';
import './LiveFeedPage.css'
import '../../index.css'

const LiveFeedPage  = () => {

  const dispatch = useDispatch()
  const [ isLoaded, setIsLoaded ] = useState(false);

  const postObj = useSelector(state => state.posts)
  // console.log("***********THIS IS THE POST OBJECT *************", postObj)

  const posts = Object.values(postObj)
  // console.log("***********THIS IS OBJECT.values(postObj)*************", posts)

  const displayPosts = posts.map((post) => (
    <PostCard key={post.id} post={ post } />
  ));

  useEffect(() => {
    dispatch(getAllPosts())
    .then(() => setIsLoaded(true))
  }, [dispatch]);

  return isLoaded && (
    <div className='outter-most-wrapper'>
      <div className='live-feed-display' /* container for comments */ >
        { displayPosts }
      </div>
    </div>
  )
};

export default LiveFeedPage;
