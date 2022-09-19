import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";
import { loadUserProfile } from '../../store/profile';
import "./ProfilePage.css"

const UserProfilePage = () => {
  let { userId } = useParams();
  userId = Number(userId);
  const dispatch = useDispatch()
  const profile = useSelector((state) => state.profile.profile);
  const [isLoaded, setIsLoaded] = useState(false);



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
                <h1>{profile.name}</h1>
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
