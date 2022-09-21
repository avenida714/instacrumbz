// import React, {useEffect, useState} from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import { NavLink, useParams } from "react-router-dom";
// import { getOnePostById } from '../../store/posts';



// function SinglePost({post}) {
//     const { postId } = useParams();
//     const dispatch = useDispatch();
//     // const post = useSelector(state => state.posts[postId])
//     // const likes = useSelector(state => state.posts[postId].likes)
//     // console.log("*******************post", post)
// //    const currentUser = useSelector(state => state.session.user)
// //    const viewedUserObj = useSelector(state => state.posts)
// //    const viewedUser = Object.values(viewedUserObj)
// //    const username = viewedUser.map((user) => user.user.username)

// //    console.log("*******************username", username)

//     // useEffect(() => {
//     //     dispatch(getOnePostById(postId))
//     //     }, [dispatch])
//          // put likes in useEffect dependency array
// // TO-DO: add like to this and import the comment component
//     if (post) {

//     return (
//         <div>
//         <div><img src={post.image_url}/></div>
//         <div>{post.location}</div>
//         <div>Comments Component: </div>
//         <div>{post.caption}</div>
//         <div>{post.user.username}</div>
//         </div>
//     )} else{
//         return null
//     }
// }

// export default SinglePost
