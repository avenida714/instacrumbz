import React, {useEffect} from 'react';
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";
import { loadUserProfile } from '../../store/profile';

const UserProfilePage = () => {
  let { userId } = useParams();
  userId = Number(userId);
  const dispatch = useDispatch()
  const currentUser = useSelector(state => state.profile);
  console.log("here----")
  console.log(currentUser)

  useEffect(() => {
    dispatch(loadUserProfile(userId))
  }, [dispatch])

  return (
    <div>
     <h1>test</h1>
    </div>
  )
}

export default UserProfilePage;
