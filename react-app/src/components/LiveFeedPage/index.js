import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, NavLink } from "react-router-dom";

import { getAllPosts } from '../../store/posts';

// import RudyComponent from PostCard


export const LiveFeedPage  = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllPosts())
  }, [dispatch])

  const postObj = useSelector(state => state.posts)
  // console.log("***********THIS IS THE POST OBJECT *************", postObj)

  const posts = Object.values(postObj)

  console.log("***********THIS IS OBJECT.values(postObj)*************", posts)

  return (
    <div>
     {posts.map((post) => (
      <div key={post.id}>
       [--------------------------------------]
        <div>
          Captions:{post.caption}
        </div>
        <div>
          Location:{post.location}
        </div>
      </div>
     ))}

    </div>
  )
}



// postsArray
