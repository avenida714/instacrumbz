import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import EditPostForm from '../CreatePostModal/EditPostForm';
import PostForm from '../CreatePostModal/PostForm';


function EditFormModal( {post} ) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      {/* <button onClick={() => setShowModal(true)}></button> */}
      <i className="fa-solid fa-ellipsis" onClick={() => setShowModal(true)}  />
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
            {/* <p onClick={() => setShowModal(false)}>X</p> */}
          <PostForm  post={post} formType="Update Post" onClick={() => setShowModal(false)}/>
        </Modal>
      )}
    </>
  );
}

export default EditFormModal;


