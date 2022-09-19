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
  console.log("here=====",userPosts)

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
                <div className='profileInfoContainer' key={profile.id}>
                  <div className='profilePic'><img src='https://assets.pokemon.com/assets/cms2/img/pokedex/full/143.png'></img></div>
                  <div className='profileDetails'>
                    <h1>{profile.name}</h1>
                    <span>{userPosts.length} posts </span>
                    <span>{profile.followers.length} followers</span>
                    <span> {profile.following.length} following</span>
                    <div>{profile.bio}</div>
                  </div>
                </div>
              )
            })}
        </div>
        <div>------------------</div>
        <div className='userPostContainer'>
            {userPosts.map((posts)=>{
              return (
                <div className='eachUserPost' key={posts.id} >
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
