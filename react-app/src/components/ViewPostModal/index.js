import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import SinglePost from '../SinglePost';
import SinglePostModal from './SinglePostModal';

function ViewPostModal({post}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)}></button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <SinglePost post={post}/>
        </Modal>
      )}
    </>
  );
}

export default ViewPostModal;
