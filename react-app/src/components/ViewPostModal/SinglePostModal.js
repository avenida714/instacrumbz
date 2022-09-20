import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { Modal } from '../../context/Modal'
import SinglePost from '../SinglePost';


// import comment component
// import create comment component




//post comes from Profile Page (see below)
function SinglePostModal( { post }) {

  const [showModal, setShowModal] = useState(false);
  // const dispatch = useDispatch()
  // const history = useHistory()

  // const params = useParams()



  return (
    <div>
      <button className="post-modal" onClick={() => setShowModal(true)}>
        <img className="post-modal"src={post.image} alt=""/>
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <SinglePost post={post}/>
        </Modal>
      )}
    </div>
  )
}

export default SinglePostModal



/*
this goes into profile page map of userPosts
  <div key={post.id}>
            <SinglePostModal post={post} />
          </div>

*/
