import React, {useEffect} from 'react';
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";
import { loadUserProfile } from '../../store/profile';

const UserProfilePage = () => {
  let { userId } = useParams();
  userId = Number(userId);
  const dispatch = useDispatch()
  const currentUser = useSelector(state => state.session.user);

  const profile = useSelector(state => state.profile);
  const userProfile = Object.values(profile)
  console.log("here----")
  console.log("=======" , userProfile[1])


  useEffect(() => {
    dispatch(loadUserProfile(userId))
  }, [dispatch])

  return (
    <div className='mainProfileContainer'>
        <h1>{currentUser.username}</h1>
        <h1>{currentUser.email}</h1>
        <h1>{currentUser.bio}</h1>
    </div>
  )
}

export default UserProfilePage;
