// import React, {useEffect, useState} from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import { Link, NavLink } from "react-router-dom";
// import { loadCurrUserPosts } from '../../store/posts';



// export const CurrentUserPage  = () => {

//     const dispatch = useDispatch()



//     const postObj = useSelector(state => state.posts)
//     // console.log("***********THIS IS THE POST OBJECT *************", postObj)

//     const posts = Object.values(postObj)

//     // console.log("***********THIS IS OBJECT.values(postObj)*************", posts)

//     useEffect(() => {
//     dispatch(loadCurrUserPosts())
//     }, [dispatch])

//     return (
//         <div>
//          {posts.map((post) => (
//           <div key={post.id}>
//             THIS IS THE CARD
//             <div>
//               Captions:{post.caption}
//             </div>
//             <div>
//               Location:{post.location}
//             </div>
//           </div>
//          ))}

//         </div>
//       )
//     }
