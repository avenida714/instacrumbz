import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";
import { loadUserProfile } from '../../store/profile';
import "./ProfilePage.css"

const UserProfilePage = () => {
  let { userId } = useParams();
  userId = Number(userId);
  const dispatch = useDispatch()
  const userPosts = useSelector((state) => state.profile.posts);
  const profile = useSelector((state) => state.profile.profile);
  const [isLoaded, setIsLoaded] = useState(false);
  console.log("here=====",profile)

  useEffect(() => {
    dispatch(loadUserProfile(userId))
    .then(() => {
      setIsLoaded(true);
    })
  }, [dispatch])

  if (isLoaded) {
    return (
      <div className='mainProfileContainer'>
        <div className='innerProfileContainer'>
            {profile.map((profile)=>{
              return(
                <div>
                  <h1>{profile.name}</h1>
                  <div>
                    <span>{userPosts.length} posts </span>
                    <span>{profile.followers.length} followers</span>
                    <span> {profile.following.length} following</span>

                  </div>

                  <div>{profile.bio}</div>
                </div>
              )
            })}
        </div>
        <div>------------------</div>
        <div className='userPostContainer'>
            {userPosts.map((posts)=>{
              return (
                <div className='eachUserPost'>
                  <div>{posts.caption}</div>
                </div>
              )
            })}
        </div>
      </div>
    )
  } else {
    return <div>Loading ... </div>
  }
}

export default UserProfilePage;
