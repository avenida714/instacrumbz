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
  const [findAProfileStatus, setFindAProfileStatus] = useState(200);
  const [isLoaded, setIsLoaded] = useState(false);
  console.log("here=====",userPosts)

  useEffect(() => {
    dispatch(loadUserProfile(userId))
    .then(() => {
      setIsLoaded(true);
    })
    .catch(async (res) => {
      setFindAProfileStatus(res.status);
    });
  }, [dispatch])

  if (isLoaded) {
    if (findAProfileStatus === 200) {
      return (
        <div className='mainProfileContainer'>
          <div className='innerProfileContainer'>
              {profile.map((profile)=>{
                if (profile) {
                  return(
                    <div className='profileInfoContainer' key={profile.id}>
                      <div className='profilePic'><img src='https://assets.pokemon.com/assets/cms2/img/pokedex/full/143.png'></img></div>
                      <div className='profileDetails'>
                        <h1>{profile.name}</h1>
                        <span>{userPosts.length}</span> posts
                        <span>{profile.followers.length}</span> followers
                        <span> {profile.following.length} </span> following
                        <div>{profile.bio}</div>
                      </div>
                    </div>
                  )
                } else {
                  <div>404</div>
                }
              })}
          </div>
          <div>------------------</div>
          <div className='userPostContainer'>
              {userPosts.map((posts)=>{
                if (posts) {
                  return (
                    <div className='eachUserPost' key={posts.id} >
                      <div>{posts.caption}</div>
                    </div>
                  )
                }
              })}
          </div>
        </div>
      )
    } else if (findAProfileStatus === 404) {
        return (
          <div className="notFound">
            <span className="notFoundError">404: not found</span>
          </div>
        );
      }
    } else {
      return <div>Loading... </div>;
    }
  };


export default UserProfilePage;
